import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { house } from '../socket';
import {readStudentsMajor, selectStudent, deselectStudent, updateStudentLocation} from '../actions/studentsActions';
import {readLocations} from '../actions/locationsActions';

import StudentCard from './StudentCard';
import LocationButton from "./LocationButton";

class ViewGrid extends React.Component{
  componentWillMount(){
    this.props.dispatch(readStudentsMajor(this.props.user.house));
    this.props.dispatch(readLocations(this.props.user.house));
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
  }
  render(){
    const studentHTML = this.props.students.students.map((student, key) => {
      if(this.props.students.selected.indexOf(student._id) != -1){
        return(<StudentCard selected student={student} key={key} addSelected={this.addSelected.bind(this)}/> );
      }
      else{
        return(<StudentCard student={student} key={key} addSelected={this.addSelected.bind(this)}/> );
      }
    });
    var lastHeading;
    const locationHTML = this.props.locations.locations.map((location, key) => {
      if(lastHeading != location.heading){
        lastHeading = location.heading;
        return(<LocationButton break location={location} key={key} updateLocation={this.updateLocation.bind(this)}/>)
      }
      else{
        lastHeading = location.heading;
        return(<LocationButton location={location} key={key} updateLocation={this.updateLocation.bind(this)}/>)
      }
    })
    return(
      <div id="view-grid" class="row" style={{marginTop: 50}}>
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
  return { students: state.students, locations: state.locations, user: state.user.user.data };
}

export default withRouter(connect(mapStateToProps)(ViewGrid));
