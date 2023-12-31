import {
    Container, Flex, Center, Heading, Text, Link as ChakraLink, FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Divider, Button, Box
} from '@chakra-ui/react'
import {Link as RouterLink, Form, useNavigate, useActionData} from 'react-router-dom';
import {useEffect, useRef} from "react";
import useSpeechSynthesis from "../../hooks/useSpeechSynthesis.jsx";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useSound from 'use-sound';
import startSound from "../../assets/sounds/start.mp3";
import axios from "axios";
import {useCookies} from "react-cookie";

export async function action({request}){
    const formData = await request.formData();
    const response = await axios.post('https://localhost:7072/api/User/Login',{
        Username: formData.get("username"),
        Password: formData.get("password")
    }).then(function (response){
        return response;
    }).catch(function (error){
        return error
    })
    return response;
}
export default function Login(){
    const loginState = useActionData();
    const {startSynthesis,setMessage,message,stopSynthesis} = useSpeechSynthesis("Giriş ekranındasınız. Üye değilseniz sağ ok tuşuna basın. Üye iseniz yukarı ok tuşuna basın.");
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const containerRef = useRef();
    const navigate = useNavigate();
    const [play, {stop}] = useSound(startSound);
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const [cookies, setCookie] = useCookies(['authToken','tokenExpire']);
    useEffect(() => {
        if (loginState){
            if (loginState.data.token){
                setMessage("Başarılı bir şekilde giriş yaptınız, ana sayfaya yönlendiriliyorsunuz.");
                setCookie('authToken',loginState.data.token.accessToken);
                setCookie('tokenExpire', loginState.data.token.expiration);
                setTimeout(()=> {
                        navigate("/")
                    }
                    ,4000);
            }else{
                setMessage("Giriş bilgileriniz hatalı, üst ok tuşu ile kullanıcı adını, alt ok tuşu ile parolanızı yeniden girebilirsiniz.")
            }
        }
    }, [loginState]);
    useEffect(()=> {
        usernameInputRef.current.focus();
    },[])

    useEffect(() => {
        stop()
        play()
    }, [listening]);

    useEffect(()=> {
        startSynthesis();
    },[message])

    if (!browserSupportsSpeechRecognition) {
        setMessage("Tarayıcı ses tanımayı desteklemiyor.")
        return  <span>Tarayıcı ses tanımayı desteklemiyor.</span>;
    }

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown"){
            passwordInputRef.current.focus();
            setMessage("Parolanızı söyleyin veya klavyeden giriş yapın, ardından enter ile giriş yapabilirsiniz.")
        }else if (e.key === "ArrowUp"){
            usernameInputRef.current.focus();
            setMessage("Kullanıcı adınızı yazın. Ctrl tuşuna basılı tutarak sesli giriş yapabilirsiniz.")
        }else if (e.key === "ArrowRight"){
            navigate("/sign-up");
        }else if (e.key === "Control"){
            if (e.repeat) return;
            stopSynthesis();
            SpeechRecognition.startListening({language: "tr", continuous: false});
        }
    }

    const handleKeyUp = (e) => {
        if (e.key === "Control"){
            if (document.activeElement === usernameInputRef.current || document.activeElement === passwordInputRef.current){
                document.activeElement.value = transcript;
                SpeechRecognition.stopListening();
                resetTranscript();
            }

        }
    }

    return (
        <Container ref={containerRef} onKeyUp={handleKeyUp} onKeyDown={handleKeyDown} width="100%" height="100vh">
            <Flex direction="column" justify="center" height="100%" width="100%" gap="5">
                <Center>
                    <Heading as="h1" size="2xl">
                        Giriş
                    </Heading>
                </Center>
                <Center>
                    <Text fontSize="lg">Henüz üye değilseniz <ChakraLink color="teal.500" fontWeight="bold" as={RouterLink} to="/sign-up">kayıt olun.</ChakraLink></Text>
                </Center>
                <Divider className="my-4" />
                <Center>
                    <Form method="post" className="w-3/4">
                        <Flex direction="column" gap="5">
                            <FormControl isInvalid={false}>
                                <FormLabel>Kullanıcı Adı</FormLabel>
                                <Input ref={usernameInputRef} _focus="" type='text' name="username" />
                                <FormErrorMessage>Hata</FormErrorMessage>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Parola</FormLabel>
                                <Input ref={passwordInputRef} type='password' name="password" />
                            </FormControl>
                            <Box width="100%" py="5">
                                <Button type="submit" width="100%" colorScheme='teal'>Giriş Yap</Button>
                            </Box>
                        </Flex>

                    </Form>
                </Center>
            </Flex>
        </Container>
    )
}