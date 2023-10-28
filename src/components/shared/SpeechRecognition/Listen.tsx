"use client"
import 'regenerator-runtime'

import {FC, useEffect, useState} from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


type ListenProps = {
    className?: string;
};

const Listen: FC<ListenProps> = ({className = ""}) => {
    const [speechRecognitionSupported, setSpeechRecognitionSupported] =
        useState(false)
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    const startListening = () => SpeechRecognition.startListening({language: 'tr', continuous:true});

    useEffect(() => {
        setSpeechRecognitionSupported(browserSupportsSpeechRecognition)
    }, [browserSupportsSpeechRecognition])

    if (!speechRecognitionSupported) {
        return <span>Browser does not support speech recognition.</span>
    }


    return  <div>
        <p>Microphone: {listening ? 'on' : 'off'}</p>
        <button onClick={startListening}>Start</button>
        <button onClick={SpeechRecognition.stopListening}>Stop</button>
        <button onClick={resetTranscript}>Reset</button>
        <p>{transcript}</p>
    </div>;
};

export default Listen;