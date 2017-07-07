import axios from "axios";
import { socket, house, scriptsDirectory } from "./../socket.js";

export function fetchAllStudents(){
  return dispatch => {
    dispatch({type: "FETCH_ALL_STUDENTS"});
    axios.get(scriptsDirectory + "fetchStudents.php", {params: { House: house }}).then((response) =>{
      dispatch({type: "FETCH_ALL_STUDENTS_FULFILLED", payload: response.data});
    }).catch((err) =>{
      dispatch({type: "FETCH_ALL_STUDENTS_REJECTED", payload: err});
    });
  }
}

export function addStudent(student){
  return dispatch => {
    dispatch({type: "ADD_STUDENT"});
    axios.get(scriptsDirectory + "addStudent.php", {params: { Student: student, House: house }}).then((response) =>{
      socket.emit("socket-server-redraw", {house});
      dispatch({type: "ADD_STUDENT_FULFILLED", payload: response.data});
    }).catch((err) =>{
      dispatch({type: "ADD_STUDENT_REJECTED", payload: err});
    });
  }
}

export function updateStudentLocation(ids, locationID){
  return dispatch => {
    dispatch({type: "UPDATE_STUDENT_LOCATION"});
    axios.get(scriptsDirectory + "updateStudentLocation.php",  {params: { IDs: ids, Location: locationID, House: house }}).then((response) =>{
      socket.emit("socket-server-redraw", {house, ids: response.ids});
      dispatch({type: "UPDATE_STUDENT_LOCATION_FULFILLED", payload: response.data});
    }).catch((err) =>{
      dispatch({type: "UPDATE_STUDENT_LOCATION_REJECTED", payload: err});
    });
  }
}

export function updateStudent(id, student){
  return dispatch => {
    dispatch({type: "UPDATE_STUDENT"});
    axios.get(scriptsDirectory + "updateStudent.php",  {params: { ID: id, Student: student, House: house }}).then((response) =>{
      socket.emit("socket-server-redraw-all", {house});
      dispatch({type: "UPDATE_STUDENT_FULFILLED", payload: response.data});
    }).catch((err) =>{
      dispatch({type: "UPDATE_STUDENT_REJECTED", payload: err});
    });
  }
}

export function deleteStudent(id){
  return dispatch => {
    dispatch({type: "DELETE_STUDENT"});
    axios.get(scriptsDirectory + "deleteStudent.php",  {params: { ID: id, House: house }}).then((response) =>{
      socket.emit("socket-server-redraw-all", {house});
      dispatch({type: "DELETE_STUDENT_FULFILLED", payload: response.data});
    }).catch((err) =>{
      dispatch({type: "DELETE_STUDENT_REJECTED", payload: err});
    });
  }
}
