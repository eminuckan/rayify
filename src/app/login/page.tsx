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
export default function Login ()
{

    // const [cmd,setCmd] = useState<string | null>('');
    const usernameInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const [speechRecognitionSupported, setSpeechRecognitionSupported] =
        useState(false)
    const [message, setMessage] = useState<string>("Merhaba bu ilk komut");

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    const speakText = () =>{
        const {synth, utter} = createUtter(287);
        utter.text = message;
        synth.speak(utter);
    }

    useEffect(() => {
        setSpeechRecognitionSupported(browserSupportsSpeechRecognition)
    }, [browserSupportsSpeechRecognition])

    useEffect(() => {
        speakText();
    }, [message]);
    const startListening = () => speechRecognitionSupported ? SpeechRecognition.startListening({language: 'tr', continuous:false}) : false;

    useEffect(() => {
        startListening();
        console.log(transcript);
        switch (transcript.trim().toLowerCase()) {
            case "tekrar":
                setMessage("ilk komut");

                break;
            case "parola":
                setMessage("ikinci komut");
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