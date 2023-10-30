"use client"
import 'regenerator-runtime'
import {useEffect, useState, useRef} from "react";
import {createUtter} from "../../utils/utter";

import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Link,
    Stack,
    Text,
} from '@chakra-ui/react'
import Logo from '../../components/shared/Logo/Logo';
import PasswordField from "components/components/shared/Form/Input/PasswordInput";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition"
import {redirect} from "next/navigation";
export default function Login ()
{
    const messages = [
        "Kullanıcı adınızı yazın, ardından parola diyerek parolanızı girebilirsiniz. Üye olmak için üye diyebilirsiniz. Bilgileri tekrar dinlemek için, tekrar diyebilirsiniz. ",
        "Parolanızı yazın ardından enter ile giriş yapın. Kullanıcı adını düzenlemek için kullanıcı diyebilirsiniz."
    ];
    // const [cmd,setCmd] = useState<string | null>('');
    const usernameInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const [speechRecognitionSupported, setSpeechRecognitionSupported] =
        useState(false)
    const [message, setMessage] = useState<string>(messages[0]);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const speakText = () =>{
        const {synth, utter} = createUtter();
        utter.text = message;
        synth.speak(utter);
    }

    useEffect(() => {
        setSpeechRecognitionSupported(browserSupportsSpeechRecognition)
    }, [browserSupportsSpeechRecognition])

    useEffect(() => {
        speakText();
        resetTranscript();
    }, [message]);
    const startListening = () => speechRecognitionSupported ? SpeechRecognition.startListening({language: 'tr', continuous:false}) : false;

    useEffect(() => {
        usernameInputRef.current?.focus();
        console.log(usernameInputRef.current?.value);
    }, []);

    useEffect(() => {
        startListening();
        switch (transcript.trim().toLowerCase()) {
            case "tekrar":
                speakText();
                break;
            case "parola":
                passwordInputRef.current?.focus();
                setMessage(messages[1]);
                break;
            case "kullanıcı":
                usernameInputRef.current?.focus();
                setMessage(messages[0]);
                break;
            case "üye":
                redirect("/sign-up")
                break;
            default:
                break;
        }
    });

    return (
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <Stack spacing="8">
                <Stack spacing="6" textAlign="center" className="flex items-center justify-center">
                    <Logo />
                    <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                        <Heading size={{ base: 'xs', md: 'sm' }}>Hesabına giriş yap</Heading>
                        <Text color="fg.muted">
                            Hesabın yok mu ? <Link href="/sign-up" className="text-blue-500 font-semibold">Üye ol</Link>
                        </Text>
                    </Stack>
                </Stack>
                <Box
                    py={{ base: '0', sm: '8' }}
                    px={{ base: '4', sm: '10' }}
                    bg={{ base: 'transparent', sm: 'bg.surface' }}
                    boxShadow={{ base: 'none', sm: 'md' }}
                    borderRadius={{ base: 'none', sm: 'xl' }}
                >
                    <Stack spacing="6">
                        <Stack spacing="5">
                            <FormControl>
                                <FormLabel htmlFor="username">Kullanıcı adı</FormLabel>
                                <Input ref={usernameInputRef} id="username" type="text" />
                            </FormControl>
                            <PasswordField ref={passwordInputRef} />
                        </Stack>
                        <HStack justify="space-between">
                            <Checkbox defaultChecked>Beni hatırla</Checkbox>
                            <Button variant="text" size="sm">
                                Parolanızı mı unuttunuz ?
                            </Button>
                        </HStack>
                        <Stack spacing="6">
                            <Button colorScheme='blue' variant="solid">Giriş yap</Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Container>
    )
}