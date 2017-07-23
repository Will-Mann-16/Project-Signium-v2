import React from "react";

export default class LocationButton extends React.Component{
  handleClick(){
    this.props.updateLocation(this.props.location._id);
  }
  render(){
    var locationStyle = {
      backgroundColor: this.props.location.colour
    }
    return(
      <div class="location-button" style={locationStyle} onClick={this.handleClick.bind(this)}>
        <div class="location-button-body">
          {this.props.location.name}
        </div>
      </div>
    );
  }
}
