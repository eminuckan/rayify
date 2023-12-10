import {Outlet} from "react-router-dom";
import {Flex, Input, Container, Button, Text} from '@chakra-ui/react'
import {jwtDecode} from "jwt-decode";
import {useCookies} from "react-cookie";
import {useEffect, useRef} from "react";
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import useSound from 'use-sound';
import startSound from "../assets/sounds/start.mp3";
import useSpeechSynthesis from "../hooks/useSpeechSynthesis.jsx";


export default function Root() {
    const [cookies] = useCookies(['authToken', 'tokenExpire']);
    const searchRef = useRef();
    const [play, {stop}] = useSound(startSound);
 const {
  transcript,
  listening,
  resetTranscript,
 } = useSpeechRecognition();
   const {stopSynthesis} = useSpeechSynthesis();

    useEffect(() => {
        stop()
        play()
    }, [listening]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Control") {
                stopSynthesis();
                searchRef.current.focus();
                SpeechRecognition.startListening({language: "tr", continuous: false});

            }
        }
        const handleKeyUp = (e) => {
            if (e.key === "Control") {
                SpeechRecognition.stopListening();
                resetTranscript();
                searchRef.current.value = transcript;
            }
        }
        document.addEventListener("keydown", handleKeyDown)
        document.addEventListener("keyup", handleKeyUp)

    })
    return <>
        <Container maxW={'100%'} padding={'2'}>
            <Flex justifyContent='space-between' width={'100%'} gap={100}>
                <Input placeholder='...' type='text' size='md' ref={searchRef} htmlSize={10}/>
                <Text width='400px'>Merhaba {jwtDecode(cookies.authToken).username}</Text>
                <Button colorScheme='gray' border='1px solid black'>Çıkış Yap</Button>
            </Flex>
        </Container>
        <Outlet/>
    </>

}
