import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  function startListening(){
    SpeechRecognition.startListening({ continuous: true, language: 'ru' })
  }

  async function stopListening(){
    await SpeechRecognition.stopListening()
    const data = {
        text: transcript
    }
    axios({
        method: "post",
        url: "http://100.73.214.19:8000/get_transcribe",
        data: data
      })
    resetTranscript()
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onMouseDown={startListening} onMouseUp={stopListening}>{listening ? 'Говорите!' : 'Говорить'}</button>
    </div>
  );
};
export default Dictaphone;