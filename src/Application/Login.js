import React from "react";
import Api from "Api";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { email:"", password: "", which: "normal" };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    event.preventDefault();
    return null;
  }

  handleSubmit(event) {
    console.log(event);
    event.preventDefault();
    this.setState({ which: "submit" });
    Api.authorization
      .performLogin(this.state.email, this.state.password)
      .then(()=> this.props.history.push("/"))
      .catch((e)=> {
        console.error(e);
        this.setState({ which: "error", errorMessage: this._errorMessageFor(e) });
      });
  }

  render() {
    return (
      <form className="login-modal application-modal" onSubmit={this.handleSubmit}>
        <h1 className="login-modal-header application-modal-header">LOGIN</h1>
        <section className="login-modal-form">
          <input
            className="login-modal-form-input application-modal-input"
            name="email" type="email" placeholder="email"
            onChange={this.handleChange} value={this.state.email} />
          <input
            className="login-modal-form-input application-modal-input"
            name="password" type="password" placeholder="password"
            onChange={this.handleChange} value={this.state.password} />
          <input
            className="login-modal-form-submit application-modal-button application-modal-button-primary"
            type="submit" value="Login" />
        </section>
      </form>
    );
  }
}
