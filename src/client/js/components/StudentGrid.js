import React from 'react';
import {connect} from 'react-redux';

import { house } from '../socket';
import {fetchAllStudents} from '../actions/studentsActions';

import StudentCard from './StudentCard';

class StudentGrid extends React.Component{
  constructor(){
    super();
    this.props.dispatch(fetchAllStudents(house));
  }
  render(){
    const studentHTML = this.props.students.students.map(student => {
      return(<StudentCard id={student.ID} firstname={student.Firstname} surname={student.Surname} yeargroup={student.Yeargroup} location={student.Location} /> );
    });
    return(
      <div>
        {studentHTML}
    </div>
  );
  }
}

function mapStateToProps(state){
  return { students: state.students };
}

export default connect(mapStateToProps)(StudentGrid);
