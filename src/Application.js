import React from "react";
import {BrowserRouter, Link, Route} from "react-router-dom";
import Api from "Api";
import Header from "Application/Header";
import Login from "Application/Login";
import Spinner from "react-spinner";
import "react-spinner/react-spinner.css";

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = { which: "normal" };

    // Api.setup().then((shouldLogin) => {
    //   if(shouldLogin) {
        // this.props.history.replace("/login");
    //   }
    //
    //   this.setState({ which: "normal" });
    // });
  }

  componentWillMount() {
    this.props.history.replace("/login");
  }

  render() {
    return (
      <div className="application">{this.renderWhich()}</div>
    );
  }

  renderWhich() {
    switch(this.state.which) {
      case "loading": return this.renderLoading();
      default: return this.props.children;
    }
  }

  renderLoading() {
    return (<div className="application-loader"><Spinner /></div>);
  }
}

Application.Login = Login;
