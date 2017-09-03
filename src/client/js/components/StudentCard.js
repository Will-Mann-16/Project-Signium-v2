import React from 'react';

export default class StudentCard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      selected: this.props.selected
    };
  }

  select(){
    this.props.addSelected(this.props.student._id);
  }

  render(){
    const locationStyle = {
      borderColor: this.props.student.location.colour,
      backgroundColor: this.props.selected ? "#CCFBCC" : "white"
    }
    const selectedStyle = {
      borderColor: 'lime',
    }
    var date = new Date(this.props.student.timelastout);
    return(
      <div class="student-card" onClick={this.select.bind(this)}>
        <div class="student-card-body" style={locationStyle}>
          <p class="student-card-body-date">{date.toLocaleTimeString()}<br/>{date.toLocaleDateString()}</p>
          <p class="student-card-body-name">{this.props.student.firstname} {this.props.student.surname}</p>
          <div class="student-card-body-bottom"><p>{this.props.student.yeargroup}</p><br/>
          <p class="student-card-body-bottom">{this.props.student.location.name}</p></div>
        </div>
      </div>
    );
    // style={this.state.selected ? selectedStyle : null}
  }
}
