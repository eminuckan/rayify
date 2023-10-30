export const createUtter = () => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance();
    return {
        synth,
        utter,
    }
}