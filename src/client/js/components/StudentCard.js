import React from 'react';

export default class StudentCard extends React.Component{
  constructor(){
    super();
    this.state = {
      selected: false
    };
  }

  select(){
    this.setState({
      selected: this.state.selected ? false: true
    });
    this.props.addSelected(this.props.student._id);
  }

  render(){
    const locationStyle = {
      borderColor: this.props.student.location.colour
    }
    const selectedStyle = {
      borderColor: "#00FF00"
    }
    return(
      <div style={locationStyle} class="student-card" onClick={this.select.bind(this)}>
        <div class="student-card-body" style={this.state.selected ? selectedStyle : ""}>
          <p>{this.props.student.firstname} {this.props.student.surname}</p>
          <p>{this.props.student.yeargroup}</p>
          <p>{this.props.student.location.name}</p>
        </div>
      </div>
    );
  }
}
