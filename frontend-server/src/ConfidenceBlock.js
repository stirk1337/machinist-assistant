import { Component } from "react";
import Dictaphone from "./dictaphone";

export default class ConfidenceBlock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="confidence-block">
                    {this.props.confidenceMessages.map((message, index) => {
                        console.log(this.props.handleConfidence)
                            return (
                                <div key={index} onClick={this.props.handleConfidence}>
                                    <p>{message.reason}</p>
                                </div>
                            );
                    })}
            </div>
        )   
    }
}