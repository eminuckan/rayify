import {Outlet,Navigate} from "react-router-dom";
import {Flex, Input, Container, Button, Text} from '@chakra-ui/react'
import {jwtDecode} from "jwt-decode";
import {useCookies} from "react-cookie";
import {useEffect, useRef, useState} from "react";
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import useSound from 'use-sound';
import startSound from "../assets/sounds/start.mp3";
import useSpeechSynthesis from "../hooks/useSpeechSynthesis.jsx";


export default function Root() {
    const [cookies,setCookie] = useCookies(['authToken', 'tokenExpire']);
    const [searchVal, setSearchVal] = useState("");
    const [username,setUsername] = useState("");
    const searchRef = useRef();
    const [play, {stop}] = useSound(startSound);
     const {
      transcript,
      listening,
      resetTranscript,
     } = useSpeechRecognition();
   const {stopSynthesis} = useSpeechSynthesis();

    let token;
   const handleToken = () => {

       if (cookies.authToken !== ""){
           token = jwtDecode(cookies.authToken);
           if (Date.now() >= token.exp*1000){
               return false;
           }else return token !== "";
       }else{
           return false;
       }
   }


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
                searchRef.current.value = transcript;
                setSearchVal(transcript);
                resetTranscript();
            }
        }
        document.addEventListener("keydown", handleKeyDown)
        document.addEventListener("keyup", handleKeyUp)
        setUsername(token.username);
    })
    return <>
        <Container maxW={'100%'} padding={'2'}>
            <Flex justifyContent='space-between' width={'100%'} gap={100}>
                <Input placeholder='...' type='text' size='md' ref={searchRef} htmlSize={10}/>
                <Text width='400px'>{username ? `Merhaba ${username}`:''}</Text>
                <Button colorScheme='gray' border='1px solid black' onClick={() => setCookie('authToken',"")}>Çıkış Yap</Button>
            </Flex>
        </Container>
        {(handleToken(token) ? <Outlet context={[searchVal,setSearchVal]} /> : <Navigate to={'/login'} />)}
    </>

}
