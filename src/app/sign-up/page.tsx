"use client"
import 'regenerator-runtime'
import {
    Box,
    Button,
    Container,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Text,
} from '@chakra-ui/react'
import Logo from '../../components/shared/Logo/Logo';
import PasswordField from "components/components/shared/Form/Input/PasswordInput";
import {useEffect, useState, useRef, FormEvent} from "react";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import {speakText} from "../../utils/utter";
import {useRouter} from "next/navigation";

export default function Login ()
{
    const router = useRouter();
    const messages = [
        "Üye olmak için kullanıcı adınızı girin. Parola girişi için parola diyebilirsiniz. Tekrar dinlemek için tekrar diyebilirsiniz.",
        "Parolanızı yazın ardından enter ile kayıt olun. Kullanıcı adını düzenlemek için kullanıcı diyebilirsiniz."
    ];
    const [speechRecognitionSupported, setSpeechRecognitionSupported] =
        useState(false);
    const [message, setMessage] = useState<string>(messages[0]);
    const usernameInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        setSpeechRecognitionSupported(browserSupportsSpeechRecognition)
    }, [browserSupportsSpeechRecognition])

    useEffect(() => {
        speakText(message);
        resetTranscript();
    }, [message]);
    const startListening = () => speechRecognitionSupported ? SpeechRecognition.startListening({language: 'tr', continuous:false}) : false;

    useEffect(() => {
        usernameInputRef.current?.focus();
    }, []);

    useEffect(() => {
        startListening();
        switch (transcript.trim().toLowerCase()) {
            case "tekrar":
                speakText(message);
                break;
            case "parola":
                passwordInputRef.current?.focus();
                setMessage(messages[1]);
                break;
            case "kullanıcı":
                usernameInputRef.current?.focus();
                setMessage(messages[0]);
                break;
            default:
                break;
        }
    });

    const handleRegister = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("Başarılı bir şekilde kayıt yaptınız, ana sayfaya yönlendiriliyorsunuz.")
        router.push("/");
        //back ende api call yapılacak
    }

    return (
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <Stack spacing="8">
                <Stack spacing="6" textAlign="center" className="flex items-center justify-center">
                    <Logo />
                    <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                        <Heading size={{ base: 'sm', md: 'md' }}>Hemen üye ol</Heading>
                        <Text color="fg.muted">
                            Hesabın var mı ? <Link href="/login" className="text-blue-500 font-semibold">Giriş yap</Link>
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
                    <form method="POST" onSubmit={handleRegister}>
                        <Stack spacing="6">
                            <Stack spacing="5">
                                <FormControl>
                                    <FormLabel htmlFor="username">Kullanıcı adı</FormLabel>
                                    <Input required={true} ref={usernameInputRef} id="username" type="text" />
                                </FormControl>
                                <PasswordField ref={passwordInputRef} />
                            </Stack>
                            <Stack spacing="6">
                                <Button type="submit" colorScheme='blue' variant="solid">Üye ol</Button>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Container>
    )
}