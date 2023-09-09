import { Component } from "react";
import Dictaphone from "./dictaphone";

export default class ChatBlock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div className="chat-block normal">
                    {this.props.chat.map((message, index) => {
                        if(message.problem !== undefined){
                            return (
                            <div key={index} className="author">
                                <p>{message.problem}</p>
                            </div>
                            );
                        }
                        else if(message.docId !== undefined){
                            return (
                                <div key={index} className="bot">
                                    <p>Пункт <b>{message.docId}</b> из Перечня действий. <br></br><br></br> {message.solution}</p>
                                </div>
                            )
                        }
                        else{
                            return (
                                <div key={index} className="bot">
                                    <p>{message.solution}</p>
                                </div>
                            )
                        }
                    })}
                </div>
            )   
        }
    }