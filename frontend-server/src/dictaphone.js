import { Component } from "react";
import { AudioRecorder } from 'react-audio-voice-recorder';
import axios from "axios";
import './App.css';

import { ReactMic } from 'react-mic';
 
export default class Dictaphone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      text: ''
    }
    this.stopRecording = this.stopRecording.bind(this)
  }
 
  startRecording = () => {
    document.querySelector('.record-voice').classList.add('active')
    console.log(this.state.record)
    this.setState({ record: true });
    if(this.state.record){
      this.stopRecording()
    }
    this.handleText = this.handleText.bind(this)
    this.onStop = this.onStop.bind(this)
  }
 
  stopRecording = () => {
    document.querySelector('.record-voice').classList.remove('active')
    this.setState({ record: false });
    console.log(this.state.record)
  }
 
  onData(recordedBlob) {
    console.log('chunk of real-time data is: ', recordedBlob);
  }

  handleText(text){
    this.setState({ text: text });
  }
 
  onStop = async (recordedBlob) => {
    console.log('recordedBlob is: ', recordedBlob);
    const audioBlob = await fetch(recordedBlob.blobURL).then((r) => r.blob());
    const audiofile = new File([audioBlob], "audiofile.mpeg", {
      type: "audio/mpeg",
    });
    var bodyFormData = new FormData();
    bodyFormData.append('file', audiofile); 
    console.log(audiofile)
    axios({
      method: "post",
      url: "http://localhost:8000/assistant/voice_problem",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(resolve => {
      this.setState((state) => ({text: resolve.data}))
    })
    .catch(function (error) {
      console.log(error);
    });
  }
 
  render() {
      return (
        <div className="voiceContainer">
          <p>{this.state.text}</p>
          <ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop}
            onData={this.onData}
            strokeColor="#000000"
            backgroundColor="#FF4081" />
          
          <img className="record-voice" src="voice-logo.svg" alt="запись" onClick={this.startRecording}></img>
        </div>
      );
  }
}