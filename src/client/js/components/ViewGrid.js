import React from 'react';
import {connect} from 'react-redux';

import { house } from '../socket';
import {fetchAllStudents, selectStudent, deselectStudent, updateLocation} from '../actions/studentsActions';

import StudentCard from './StudentCard';

class StudentGrid extends React.Component{
  constructor(){
    super();
    this.props.dispatch(fetchAllStudents());
    var selectedIDs = this.props.students.selected;
    selectedIDs.forEach(function(val){
      this.props.dispatch(deselectStudent(val));
    });
  }
  addSelected(id){
    var selectedIDs = this.props.students.selected;
    var index = selectedIDs.indexOf(id);
    if(index != -1){
      this.props.dispatch(deselectStudent(id));
    }else{
      this.props.dispatch(selectStudent(id));
    }
  }
  updateLocation(buttonID){
    var selectedIDs = this.props.students.selected;
    this.props.dispatch(updateLocation(selectedIDs, buttonID));
    selectedIDs.forEach(function(val){
      this.props.dispatch(deselectStudent(val));
    });
  }
  render(){
    const studentHTML = this.props.students.students.map(student => {
      return(<StudentCard student={student} addSelected={this.addSelected}/> );
    });
    const locationHTML = this.props.locations.locations.map(location => {
      return(<LocationButton location={location}  updateLocation={this.updateLocation}/>)
    })
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
