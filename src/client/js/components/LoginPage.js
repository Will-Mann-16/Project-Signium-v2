import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import {requestLogin} from "../actions/usersActions.js";

class LoginPage extends React.Component{
  constructor(){
    super();
    this.state = {
      loadingClass: this.props.user.fetching ? "loading" : "",
      authenticatedClass: this.props.user.authenticated ? "accepted" : "denied"
    };
  }
  componentDidMount(){
    if(this.props.user.authenticated){
      this.props.history.replace("/");
    }
  }
  submitLogin(){
    this.props.dispatch(requestLogin({Email: this.state.email,  Password: this.state.password}));
  }
  handleChange(event){
    const value = event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }
  render(){
    <div class="container login-form">
      <h3>Login</h3>
      <input name="username" type="text" placeholder="Username" class={this.state.authenticatedClass} onChange={this.handleChange.bind(this)}/>
      <input name="password" type="password" placeholder="Password" class={this.state.authenticatedClass} onChange={this.handleChange.bind(this)}/>
      <button onClick={this.submitLogin.bind(this)}>Login</button>
      <div class={this.state.loadingClass}></div>
    </div>
  }
}

function mapStateToProps(state){
  return{
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(LoginPage));
