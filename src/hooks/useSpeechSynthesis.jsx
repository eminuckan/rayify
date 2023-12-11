import {useState} from "react";

function useSpeechSynthesis(text){
    const [message, setMessage] = useState(text);
    const [speaking, setSpeaking] = useState(false);
    let utter = new SpeechSynthesisUtterance(message);
    utter.lang = "tr";
    utter.pitch = "1";
    utter.rate = 1.25;


    const startSynthesis = function (){
        speechSynthesis.cancel();
        speechSynthesis.speak(utter);
        setSpeaking(true);
    }
    const pauseSynthesis = function (){
        speechSynthesis.pause(utter);
        setSpeaking(false);
    }

    const stopSynthesis = function (){
        speechSynthesis.cancel(utter);
        setSpeaking(false);
    }


    return {
        startSynthesis,
        pauseSynthesis,
        stopSynthesis,
        setMessage,
        message,
        speaking
    }

}

export default useSpeechSynthesis;