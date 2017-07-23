import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class Navbar extends React.Component{
  render(){
    return(
      <nav class="main-topnav">
        <a>Home</a>
        <a>Welcome back, {this.props.user.user.firstname}</a>
      </nav>
    );
  }
}

function mapStateToProps(state){
  return{
    user: state.user
  };
}

export default connect(mapStateToProps)(Navbar);
