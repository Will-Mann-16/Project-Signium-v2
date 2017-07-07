import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class Navbar extends React.Component{
  render(){
    const linkList = [
      {
        name: "Home",
        path: "mainpage"
      }
    ];
    return(
      <div>

      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    user: state.user
  };
}

export default connect(mapStateToProps)(Navbar);
