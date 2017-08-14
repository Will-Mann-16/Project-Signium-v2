import React from "react";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";

class Navbar extends React.Component{
  render(){
    return(
      <nav class="main-topnav">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/students">Students</NavLink>
      </nav>
    );
  }
}

function mapStateToProps(state){
  return{
    user: state.user
  };
}

export default connect(mapStateToProps)(Navbar)
