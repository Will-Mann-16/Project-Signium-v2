import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {push} from "react-router-redux"

import {requestLogin} from "../actions/usersActions.js";

class LoginModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }
  submitLogin() {
    this.props.dispatch(requestLogin(this.state.username,this.state.password));
  }
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({[name]: value});
  }
  render() {
    if (!this.props.show){
      return null;
    }
    return (
      <div class="modal">
        <div class="modal-body">
        <h3>Login</h3>
        <input name="username" type="text" placeholder="Username" class={this.state.authenticatedClass} onChange={this.handleChange.bind(this)}/>
        <input name="password" type="password" placeholder="Password" class={this.state.authenticatedClass} onChange={this.handleChange.bind(this)}/>
        <button onClick={this.submitLogin.bind(this)}>Login</button>
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  return {user: state.user}
}

export default connect(mapStateToProps)(LoginModal);
