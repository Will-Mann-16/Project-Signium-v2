import React from 'react';

export default class StudentCard extends React.Component{
  constructor(props){
    super(props);
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
      borderColor: 'lime',
    }
    var date = new Date(this.props.student.timelastout);
    return(
      <div className="student-card" style={locationStyle} onClick={this.select.bind(this)}>
        <div className="student-card-body" style={this.state.selected ? selectedStyle : null}>
          <p class="student-card-body-date">{date.toLocaleTimeString()}<br/>{date.toLocaleDateString()}</p>
          <p class="student-card-body-name">{this.props.student.firstname} {this.props.student.surname}</p>
          <div class="student-card-body-bottom"><p>{this.props.student.yeargroup}</p><br/>
          <p class="student-card-body-bottom">{this.props.student.location.name}</p></div>
        </div>
      </div>
    );
  }
}
