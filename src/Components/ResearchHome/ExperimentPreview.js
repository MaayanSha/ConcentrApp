import React, { Component, Fragment } from "react";
import { Col } from "reactstrap";
import Home from "./Home.js";
import "./css/home.css"


class ExperimentPreview extends Component {

    constructor(props) {
    super(props);
    this.state = {
      color: "",
      text: "",
    };
    this.colors = ["rgba(255,165,0, 0.2)", "rgba(195, 155, 211, 0.3)",
    "rgba(133, 146, 158,0.2)", "rgba(127, 179, 213, 0.3)", "rgba(22, 160, 133,0.2)",
        "rgba(216,17,89,0.3)","rgba(143,45,86,0.3)","rgba(33,131,128,0.3)","rgba(251,177,60,0.3)","rgba(115,210,222,0.3)"];
    this.text = ["rgb(243, 156, 18)", "rgb(142, 68, 173)", "rgb(52, 73, 94)", "rgb(41, 128, 185)","rgb(14, 102, 85)",
        "rgb(216,17,89)","rgb(143,45,86)","rgb(33,131,128)","rgb(251,177,60)","rgb(31,120,132)"];
    this.current = 0;
  }

  getRandomColor() {
    const randomIndex = Math.floor(Math.random() * this.colors.length);
    this.current = randomIndex;
    return this.colors[randomIndex];
  }
  getTextColor() {
    return this.text[this.current];
  }

  componentDidMount() {
    const randomColor = this.getRandomColor();
    const textColor = this.getTextColor();
    this.setState({ color: randomColor, text: textColor });
  }

    previewTemplate = {
       title:() => <h6 className="title" style={{ color: this.state.text}}>{this.props.title}</h6>,
       data:() => <h2 className="desc" style={{ color: this.state.text}}>{this.props.description}</h2>,
    };

  render() {
//todo: make a new data modal for statistics per experiment and call it here
    return (
        <div className="box2" style={{ backgroundColor: this.state.color }}>
            {this.previewTemplate.title()}
            {this.previewTemplate.data()}
        </div>
    );
  }
}
export default ExperimentPreview;