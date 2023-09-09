import { Component } from "react";
import Dictaphone from "./dictaphone";
import BodyContainer from "./BodyContainer";
import ChatContainer from "./ChatContainer";
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ChatIsActive: false
    }
    this.handleIsActive = this.handleIsActive.bind(this)
  }

  handleIsActive = () => {
    this.setState({ ChatIsActive: true });
  }

  render() {
    return (
      <div>
        <img src="logo.svg" className="logo"></img>
        <img src="train.svg" className="background-train"></img>
        <img src="cloud.svg" className="background-cloud"></img>
        <BodyContainer startVoice={this.handleIsActive} active={this.state.ChatIsActive}></BodyContainer>
        <ChatContainer active={this.state.ChatIsActive}></ChatContainer>
      </div>
    )
  }
}