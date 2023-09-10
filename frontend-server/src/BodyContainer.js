import { Component } from "react";

export default class BodyContainer extends Component {
  render() {
    if(!this.props.active){
        return (
            <div className="body-container">
              <div className="body-container-top">
                  <div className="li-models medium">
                      <img src="gear.svg" className="gear-icon"></img>
                      <ul>
                          <li>Модель SRRIER</li>
                          <span></span>
                          <li>Модель SR3213R</li>
                          <span></span>
                          <li>Модель SfewER</li>
                          <span></span>
                          <li>Модель EFW</li>
                          <span></span>
                          <li>Модель SRefewR</li>
                          <span></span>
                          <li>Модель SRefewR</li>
                          <span></span>
                          <li>Модель SRefewR</li>
                      </ul>
                  </div>  
                  <div className="start-listening" onClick={this.props.startVoice}>
                      <img src="train-cooler.svg" className="train"></img>
                      <h1>Голосовой помощник машиниста</h1>
                      <img src="microphon-main.svg" className="micro-main"></img>
                  </div>
              </div>
            </div>
          )
    }
  }
}