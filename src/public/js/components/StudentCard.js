import React from 'react';
import {connect} from 'react-redux';

class StudentCard extends React.Component{
  constructor(){
    super();
    this.props.locations.forEach(function(key, val){
      if(val.ID == this.props.location){
        this.state = {
          location: val
        }
      }
    })
  }
  render(){
    const borderStyle = {
      borderColor: this.state.location.colour
    }
    return(
      <div style={borderStyle}>
        <p>{this.props.firstname} {this.props.surname}</p>
        <p>{this.props.yeargroup}</p>
        <p>{this.state.location.name}</p>
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
      locations: state.locations
  }
}

export default connect(mapStateToProps)(StudentCard);
