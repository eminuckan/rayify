import {useState} from "react";

function useSpeechSynthesis(text){
    const [message, setMessage] = useState(text);
    let utter = new SpeechSynthesisUtterance(message);
    utter.lang = "tr";
    utter.pitch = "1";
    utter.rate = 1.25;

    const startSynthesis = function (){
        speechSynthesis.cancel();
        speechSynthesis.speak(utter);
    }
    const pauseSynthesis = function (){
        speechSynthesis.pause(utter);
    }

    const stopSynthesis = function (){
        speechSynthesis.cancel(utter);
    }


    return {
        startSynthesis,
        pauseSynthesis,
        stopSynthesis,
        setMessage,
        message
    }

}

export default useSpeechSynthesis;