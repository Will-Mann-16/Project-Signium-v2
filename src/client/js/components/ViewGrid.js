import React from 'react';
import {connect} from 'react-redux';

import { house } from '../socket';
import {fetchStudentsMajor, selectStudent, deselectStudent, updateStudentLocation} from '../actions/studentsActions';
import {fetchLocations} from '../actions/locationsActions';

import StudentCard from './StudentCard';
import LocationButton from "./LocationButton";

class ViewGrid extends React.Component{
  componentWillMount(){
    this.props.dispatch(fetchStudentsMajor());
    this.props.dispatch(fetchLocations());
    this.deselectAll();
  }
  deselectAll(){
    var selectedIDs = this.props.students.selected;
    for(var i = 0; i < selectedIDs.length; i++){
      var id = selectedIDs[i];
      this.props.dispatch(deselectStudent(id));
    }
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
    this.props.dispatch(updateStudentLocation(selectedIDs, buttonID));
    this.deselectAll();
  }
  render(){
    const studentHTML = this.props.students.students.map((student, key) => {
      return(<StudentCard student={student} key={key} addSelected={this.addSelected.bind(this)}/> );
    });
    const locationHTML = this.props.locations.locations.map((location, key) => {
      return(<LocationButton location={location} key={key} updateLocation={this.updateLocation.bind(this)}/>)
    })
    return(
      <div id="view-grid" class="row container-large">
        <div class="col-10">
        {studentHTML}
      </div>
      <div class="col-2">
        {locationHTML}
      </div>
    </div>
  );
  }
}

function mapStateToProps(state){
  return { students: state.students, locations: state.locations };
}

export default connect(mapStateToProps)(ViewGrid);
