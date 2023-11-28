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


export async function action({request}){
 const formData = await request.formData();
 const response = await axios.post('https://localhost:7072/api/User',{
     Username: formData.get("username"),
     Password: formData.get("password")
 }).then(function (response){
     return response;
 }).catch(function (error){
     return error
 })
    return response;

}
export default function Signup(){
    const signUpState = useActionData();
    const {startSynthesis,setMessage,message,stopSynthesis} = useSpeechSynthesis("Kayıt ekranındasınız. Üye iseniz sağ ok tuşuna basın. Üye değilseniz yukarı ok tuşuna basın.");
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

    useEffect(()=> {
        usernameInputRef.current.focus();
    },[])

    useEffect(()=> {
        if (signUpState){
            if (signUpState.data.succeeded){
                setMessage("Kayıt işlemi başarılı, giriş sayfasına yönlendiriliyorsunuz.");
                setTimeout(()=> {
                        navigate("/login");
                    }
                    ,4000);

            }else{
                if (signUpState.data.message.match(/.*(?= - )/gm)[0] === "PasswordTooShort"){
                    setMessage("Parolanız minimum 6 karakter olmalı. Alt ok tuşuna basarak parolanızı düzenleyin.");
                }else if(signUpState.data.message.match(/.*(?= - )/gm)[0] === "DuplicateUserName"){
                    setMessage("Kullanıcı adı mevcut, üst ok tuşuna basarak tekrar girin.");
                }
            }
        }
    },[signUpState])

    useEffect(() => {
        stop()
        play()
    }, [listening]);

    useEffect(()=> {
        startSynthesis();
    },[message])

    if (!browserSupportsSpeechRecognition) {
        setMessage("Tarayıcı ses tanımayı desteklemiyor.");
        return <span>Tarayıcı ses tanımayı desteklemiyor.</span>;
    }

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown"){
            passwordInputRef.current.focus();
            setMessage("Parolanızı söyleyin veya klavyeden giriş yapın, ardından enter ile kayıt olabilirsiniz.")
        }else if (e.key === "ArrowUp"){
            usernameInputRef.current.focus();
            setMessage("Kullanıcı adınızı yazın. Ctrl tuşuna basılı tutarak sesli giriş yapabilirsiniz.")
        }else if (e.key === "ArrowRight"){
            navigate("/login");
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
                resetTranscript();
            }
            SpeechRecognition.stopListening();
        }
    }

    return (
        <Container ref={containerRef} onKeyUp={handleKeyUp} onKeyDown={handleKeyDown} width="100%" height="100vh">
            <Flex direction="column" justify="center" height="100%" width="100%" gap="5">
                <Center>
                    <Heading as="h1" size="2xl">
                        Kayıt Ol
                    </Heading>
                </Center>
                <Center>
                    <Text fontSize="lg">Zaten üye iseniz <ChakraLink color="teal.500" fontWeight="bold" as={RouterLink} to="/login">giriş yapın.</ChakraLink></Text>
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
                                <Button type="submit" width="100%" colorScheme='teal'>Kayıt Ol</Button>
                            </Box>
                        </Flex>
                    </Form>
                </Center>
            </Flex>
        </Container>
    )
}