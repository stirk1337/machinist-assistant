import { Component } from "react";
import Dictaphone from "./dictaphone";

export default class Microphon extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(!this.props.isRecord){
            return (
                <div className="micro">
                    <img className="record-voice" src="microphon-main.svg" alt="запись" onClick={this.props.startRecording}></img>
                </div>
            )   
        }
        else{
            return (
                <div className="micro">
                    <img className="record-voice" src="microphon-active.svg" alt="запись" width="185px" height="185px" onClick={this.props.startRecording}></img>
                </div>
            )   
        }
    }
}