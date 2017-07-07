import axios from "axios";
import { socket, house, scriptsDirectory } from "./../socket.js";

export function fetchAllLocations(){
  return function(dispatch){
    dispatch({type: "FETCH_ALL_LOCATIONS"});
    axios.get(scriptsDirectory + "fetchLocations.php", {params: { House: house }}).then((response) =>{
      dispatch({type: "FETCH_ALL_LOCATIONS_FULFILLED", payload: response.data.json()});
    }).catch((err) =>{
      dispatch({type: "FETCH_ALL_LOCATIONS_REJECTED", payload: err});
    });
  }
}

export function addLocation(location){
  return function(dispatch){
    dispatch({type: "ADD_LOCATION"});
    axios.get(scriptsDirectory + "addLocation.php", {params: { Location: location, House: house }}).then((response) =>{
      socket.emit("socket-server-redraw", {house});
      dispatch({type: "ADD_LOCATION_FULFILLED", payload: response.data});
    }).catch((err) =>{
      dispatch({type: "ADD_LOCATION_REJECTED", payload: err});
    });
  }
}

export function updateLocation(id, location){
  return function(dispatch){
    dispatch({type: "UPDATE_LOCATION"});
    axios.get(scriptsDirectory + "updateLocation.php",  {params: { ID: id, Location: location, House: house }}).then((response) =>{
      socket.emit("socket-server-redraw-all", {house});
      dispatch({type: "UPDATE_LOCATION_FULFILLED", payload: response.data});
    }).catch((err) =>{
      dispatch({type: "UPDATE_LOCATION_REJECTED", payload: err});
    });
  }
}

export function deleteLocation(id){
  return function(dispatch){
    dispatch({type: "DELETE_LOCATION"});
    axios.get(scriptsDirectory + "deleteLocation.php",  {params: { ID: id, House: house }}).then((response) =>{
      socket.emit("socket-server-redraw-all", {house});
      dispatch({type: "DELETE_LOCATION_FULFILLED", payload: response.data});
    }).catch((err) =>{
      dispatch({type: "DELETE_LOCATION_REJECTED", payload: err});
    });
  }
}
