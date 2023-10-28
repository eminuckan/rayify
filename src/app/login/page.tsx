"use client"
import 'regenerator-runtime'
import {useEffect, useState, useCallback} from "react";
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
import {useSpeechSynthesisApi} from "../../hooks/useSpeechSynthesisApi";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition"

export default function Login ()
{

    const [cmd,setCmd] = useState<string | null>('');

    const [speechRecognitionSupported, setSpeechRecognitionSupported] =
        useState(false)

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        setSpeechRecognitionSupported(browserSupportsSpeechRecognition)
    }, [browserSupportsSpeechRecognition])

    const startListening = () => SpeechRecognition.startListening({language: 'tr', continuous:false});
    const {
        text,
        setText,
        isSpeaking,
        isPaused,
        isResumed,
        isEnded,
        speak,
        pause,
        resume,
        cancel
    } = useSpeechSynthesisApi();
    useEffect(() => {
        setText("Merhaba, kullanıcı adınızı girip ardından Parola diyerek parolanızı girebilirsiniz.");
    }, []);
    useEffect(() => {
        speak();
        resetTranscript();
    },[text])


    useEffect(() => {
        startListening();
        console.log(transcript);
    });


    return (
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <Stack>
                <Button onClick={speak}>Speak</Button>
                <Button onClick={cancel}>Cancel</Button>
                <Button onClick={() => console.log(isSpeaking)}>Log state value</Button>
            </Stack>
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
                                <Input id="username" type="text" />
                            </FormControl>
                            <PasswordField />
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