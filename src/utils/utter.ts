export const createUtter = (voice: number = 287) => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();

    const utter = new SpeechSynthesisUtterance();

    utter.voice = voices[voice];
    return {
        synth,
        utter
    }
}