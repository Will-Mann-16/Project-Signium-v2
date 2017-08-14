import React from "react"
import {connect} from "react-redux"
import {push} from "react-router-redux"
import {house} from "../socket"
import {addStudent, updateStudent} from "../actions/studentsActions"


class StudentPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      firstname: "",
      surname: "",
      yeargroup: "",
      house: house
    }
  }
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;

    this.setState({[name]: value});
  }

  isSelected(yeargroup,text, student){
    if(this.props.edit && yeargroup === student.yeargroup){
      return(<option value={yeargroup} selected>{text}</option>);
    }
    else{
      return(<option value={yeargroup}>{text}</option>);
    }
  }
  submitData(){
    if(this.props.edit){
      this.props.dispatch(updateStudent({...this.state, id: this.props.studentID}));
    }else{
      this.props.dispatch(addStudent({...this.state}));
    }
    this.props.dispatch(push("/"))
  }
  render(){
    if(this.props.edit){
      var student = {};
      this.props.students.students.map((nStudent) =>{
        if(nStudent.code == this.props.studentID){
          student = nStudent;
        }
      })
      return(
        <div class="container">
          <div class="student-card-large">

          </div>
          <div class="col-5">
            <input class="form-input" onChange={this.handleChange.bind(this)} name="firstname" value={student.firstname} placeholder="Firstname"/>
            <input class="form-input" onChange={this.handleChange.bind(this)} name="surname" value={student.surname} placeholder="Surname"/>
            <select class="form-input" name="yeargroup" onChange={this.handleChange.bind(this)}>
              {this.isSelected("3rd", "Third Form", student)}
              {this.isSelected("4th", "Fourth Form", student)}
              {this.isSelected("5th", "Fifth Form", student)}
              {this.isSelected("L6th", "Lower Sixth", student)}
              {this.isSelected("U6th", "Upper Sixth", student)}
            </select>
            <button class="btn btn-primary" onClick={this.submitData.bind(this)}>Submit</button>
          </div>
        </div>
      );
    }
    else{
      return(
        <div class="container">
          <div class="student-card-large">

          </div>
          <div class="col-5">
            <input class="form-input" onChange={this.handleChange.bind(this)} name="firstname" placeholder="Firstname"/>
            <input class="form-input" onChange={this.handleChange.bind(this)} name="surname" placeholder="Surname"/>
            <select name="yeargroup" onChange={this.handleChange.bind(this)}>
              {this.isSelected("3rd", "Third Form", student)}
              {this.isSelected("4th", "Fourth Form", student)}
              {this.isSelected("5th", "Fifth Form", student)}
              {this.isSelected("L6th", "Lower Sixth", student)}
              {this.isSelected("U6th", "Upper Sixth", student)}
            </select>
            <button class="btn btn-primary" onClick={this.submitData.bind(this)}>Submit</button>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state){
  return {students: state.students}
}

export default connect(mapStateToProps)(StudentPage)
