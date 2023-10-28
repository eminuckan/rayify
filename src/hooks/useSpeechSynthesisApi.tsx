import { useState } from "react";

export const useSpeechSynthesisApi = () => {
    const [text, setText] = useState<string>("");
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [isResumed, setIsResumed] = useState<boolean>(false);
    const [isEnded, setIsEnded] = useState<boolean>(false);


    const speak = async () => {
        let utter = new SpeechSynthesisUtterance();
        utter.text = text;
        function speak() {
            window.speechSynthesis.speak(utter);
        }
        speak()
        setIsSpeaking(true);
        setIsEnded(false);
    }

    const pause = async () => {
        function pause() {
            window.speechSynthesis.pause();
        }
        pause();
        setIsPaused(true);
        setIsSpeaking(false);
        setIsEnded(false);
        setIsResumed(false);
    }

    const resume = async () => {
        function resume() {
            window.speechSynthesis.resume();
        }
        resume();
        setIsPaused(false);
        setIsSpeaking(false);
        setIsEnded(false);
        setIsResumed(true);
    }

    const cancel = async () => {
        function cancel() {
            window.speechSynthesis.cancel();
        }
        cancel();
        setIsPaused(false);
        setIsResumed(false);
        setIsSpeaking(false);
        setIsEnded(true);
    }
    return {
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

    }
}