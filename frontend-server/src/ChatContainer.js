import { Component } from "react";
import Dictaphone from "./dictaphone";
import ConfidenceBlock from "./ConfidenceBlock";
import ChatBlock from "./ChatBlock";
import { xSpeech } from "./model";

export default class ChatContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            confidenceMessages: []
        }
        this.handleMessages = this.handleMessages.bind(this)
        this.handleConfidence = this.handleConfidence.bind(this)
    }

    handleMessages(messageData){
        console.log(messageData)
        if(!messageData.failure){
            return
        }
        const Authormessage = {
            id: this.state.messages.length + 1,
            problem: messageData.failure
        }
        this.state.messages.push(Authormessage)
        if(messageData.solutions.length === 0){
            const BotMessage = {
                id: this.state.messages.length + 1,
                solution: 'Повторите ваш вопрос'
            }
            xSpeech.speak('Повторите ваш вопрос')
            this.state.messages.push(BotMessage)
            this.setState(state => {
                const list = [...state.messages];
                return {
                  list
                };
            });
            return
        }
        if(messageData.solutions.length === 1){
            const solution = messageData.solutions[0]
            const BotMessage = {
                id: this.state.messages.length + 1,
                docId: solution.id,
                solution: solution.solution
            }
            xSpeech.speak(`Пункт ${solution.id} из Перечня действий. <br></br><br></br> ${solution.solution}`)
            this.state.messages.push(BotMessage)
            console.log(this.state.messages)
        }
        else{
            xSpeech.speak('Выберите один из вариантов причин')
            messageData.solutions.forEach(element => {
                this.state.confidenceMessages.push(element)
            });
            console.log(this.state.confidenceMessages)
            this.setState(state => {
                const list2 = [...state.confidenceMessages];
                return {
                  list2
                };
            });
        }
        this.setState(state => {
            const list = [...state.messages];
            return {
              list
            };
        });
    }

    handleConfidence = (e) => {
        const possibleProblem = e.target.innerText
        this.state.confidenceMessages.forEach(element => {
            if(element.reason === possibleProblem){
                const BotMessage = {
                    id: this.state.messages.length + 1,
                    docId: element.id,
                    solution: element.solution
                }
                xSpeech.speak(`Пункт ${element.id} из Перечня действий. <br></br><br></br> ${element.solution}`)
                this.state.messages.push(BotMessage)
                console.log(this.state.messages)
            }
        });
        this.setState(state => {
            const list = [...state.messages];
            return {
              list
            };
        });
        this.setState((state) => ({confidenceMessages: []}))
        console.log(this.state.messages)
        console.log(this.state.confidenceMessages)
    }

    render() {
        if(this.props.active){
            return (
                <div>
                    <div className="chat-container">
                        <ChatBlock chat={this.state.messages}></ChatBlock>
                        <ConfidenceBlock confidenceMessages={this.state.confidenceMessages} handleConfidence={this.handleConfidence}></ConfidenceBlock>
                    </div>
                    <Dictaphone appendMessage={this.handleMessages}></Dictaphone>
                </div>
            )   
        }
    }
}