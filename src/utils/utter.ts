export const createUtter = () => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance();
    return {
        synth,
        utter,
    }
}

export const speakText = (message: string,lang: string = "tr-TR") =>{
    const {synth, utter} = createUtter();
    utter.lang = "tr-TR";
    utter.text = message;
    utter.voice = synth.getVoices()[0];
    synth.cancel();
    synth.speak(utter);
}