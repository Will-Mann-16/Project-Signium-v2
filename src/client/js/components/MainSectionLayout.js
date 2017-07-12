import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { withRouter } from "react-router-dom";

import Navbar from "./Navbar.js";

class MainSectionLayout extends React.Component{
  componentWillMount(){
    if(!this.props.user.authenticated && !this.props.history.location.path !== "/logon"){
      this.props.history.push("/login");
    }
  }
  render(){
    const { location } = this.props;
    return(
        <Navbar location={location} />
    );
  }
}

function mapStateToProps(state){
  return{
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(MainSectionLayout));
