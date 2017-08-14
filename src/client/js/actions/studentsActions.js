/*jshint esversion: 6 */
import axios from "axios";
import { emit, house, scriptsDirectory } from "./../socket.js";

export function fetchStudentsMajor(){
  return dispatch => {
    dispatch({type: "FETCH_STUDENTS_MAJOR"});
    axios.get(scriptsDirectory + "students/read", {params: { house: house }}).then((response) =>{
      dispatch({type: "FETCH_STUDENTS_MAJOR_FULFILLED", payload: response.data.students});
    }).catch((err) =>{
      dispatch({type: "FETCH_STUDENTS_MAJOR_REJECTED", payload: err});
    });
  };
}

export function fetchStudentsMinor(){
  return dispatch => {
    dispatch({type: "FETCH_STUDENTS_MINOR"});
    axios.get(scriptsDirectory + "students/read", {params: {house: house, minor: true}}).then((response) =>{
      if(response.data.success){
        emit("socket-client-server-redraw-major");
        dispatch({type: "ADD_STUDENT_FULFILLED", payload: response.data.students});
      }
      else{
        dispatch({type: "ADD_STUDENT_REJECTED", payload: response.data.reason});
      }    }).catch((err) =>{
      dispatch({type: "FETCH_STUDENTS_MINOR_REJECTED", payload: err});
    });
  };
}

export function selectStudent(id){
  return dispatch => {
    dispatch({type: "SELECT_STUDENT", payload: id});
  }
}
export function deselectStudent(id){
  return dispatch => {
    dispatch({type: "DESELECT_STUDENT", payload: id});
  }
}

export function addStudent(student){
  return dispatch => {
    dispatch({type: "ADD_STUDENT"});
    axios.get(scriptsDirectory + "students/add", {params: { student: student }}).then((response) =>{
      if(response.data.success){
        emit("socket-client-server-redraw-major");
        dispatch({type: "ADD_STUDENT_FULFILLED", payload: true});
      }
      else{
        dispatch({type: "ADD_STUDENT_REJECTED", payload: response.data.reason});
      }
    }).catch((err) =>{
      dispatch({type: "ADD_STUDENT_REJECTED", payload: err});
    });
  };
}

export function updateStudentLocation(ids, location){
  return dispatch => {
    dispatch({type: "UPDATE_STUDENT_LOCATION"});
    axios.get(scriptsDirectory + "students/update-location",  {params: { ids: JSON.stringify(ids), location: location, house: house }}).then((response) =>{
      if(response.data.success){
        emit("socket-client-server-redraw-minor");
        dispatch({type: "UPDATE_STUDENT_LOCATION_FULFILLED", payload: response.data.students});
      }
      else{
        dispatch({type: "UPDATE_STUDENT_LOCATION_REJECTED", payload: response.data.reason});
      }
    }).catch((err) =>{
      dispatch({type: "UPDATE_STUDENT_LOCATION_REJECTED", payload: err});
    });
  };
}

export function updateStudent(id, student){
  return dispatch => {
    dispatch({type: "UPDATE_STUDENT"});
    axios.get(scriptsDirectory + "students/update",  {params: { id: id, student: student, house: house }}).then((response) =>{
      if(response.data.success){
        emit("socket-client-server-redraw-major");
        dispatch({type: "UPDATE_STUDENT_FULFILLED", payload: response.data.student});
      }
      else{
        dispatch({type: "UPDATE_STUDENT_REJECTED", payload: response.data.reason});
      }
    }).catch((err) =>{
      dispatch({type: "UPDATE_STUDENT_REJECTED", payload: err});
    });
  };
}

export function deleteStudent(id){
  return dispatch => {
    dispatch({type: "DELETE_STUDENT"});
    axios.get(scriptsDirectory + "student/delete",  {params: { id: id, house: house }}).then((response) =>{
      if(response.data.success){
        emit("socket-client-server-redraw-minor");
        dispatch({type: "DELETE_STUDENT_FULFILLED", payload: response.data.success});
      }
      else{
        dispatch({type: "DELETE_STUDENT_REJECTED", payload: response.data.reason});
      }
    }).catch((err) =>{
      dispatch({type: "DELETE_STUDENT_REJECTED", payload: err});
    });
  };
}
