import axios from "axios";
import { socket, house, scriptsDirectory } from "./../socket.js";

export function fetchLocations(){
  return function(dispatch){
    dispatch({type: "FETCH_LOCATIONS"});
    axios.get(scriptsDirectory + "locations/read", {params: { house: house }}).then((response) =>{
      if(response.data.success){
        dispatch({type: "FETCH_LOCATIONS_FULFILLED", payload: response.data.locations});
      }
      else{
        dispatch({type: "FETCH_LOCATIONS_REJECTED", payload: response.data.reason});
      }
    }).catch((err) =>{
      dispatch({type: "FETCH_LOCATIONS_REJECTED", payload: err});
    });
  }
}

export function addLocation(location){
  return function(dispatch){
    dispatch({type: "ADD_LOCATION"});
    axios.get(scriptsDirectory + "locations/create", {params: { location: location }}).then((response) =>{
      if(response.data.success){
        socket.emit("socket-client-server-redraw-major");
        dispatch({type: "ADD_LOCATION_FULFILLED", payload: response.data.success});
      }
      else{
        dispatch({type: "ADD_LOCATION_REJECTED", payload: response.data.reason});
      }
      dispatch({type: "ADD_LOCATION_REJECTED", payload: err});
    });
  }
}

export function updateLocation(id, location){
  return function(dispatch){
    dispatch({type: "UPDATE_LOCATION"});
    axios.get(scriptsDirectory + "locations/update",  {params: { id: id, location: location }}).then((response) =>{
      if(response.data.success){
        socket.emit("socket-client-server-redraw-major");
        dispatch({type: "UPDATE_LOCATION_FULFILLED", payload: response.data.location});
      }
      else{
        dispatch({type: "UPDATE_LOCATION_REJECTED", payload: response.data.reason});
      }
    }).catch((err) =>{
      dispatch({type: "UPDATE_LOCATION_REJECTED", payload: err});
    });
  }
}

export function deleteLocation(id){
  return function(dispatch){
    dispatch({type: "DELETE_LOCATION"});
    axios.get(scriptsDirectory + "locations/delete",  {params: { id: id }}).then((response) =>{
      if(response.data.success){
        socket.emit("socket-client-server-redraw-major");
        dispatch({type: "DELETE_LOCATION_FULFILLED", payload: response.data.success});
      }
      else{
        dispatch({type: "DELETE_LOCATION_REJECTED", payload: response.data.reason});
      }
    }).catch((err) =>{
      dispatch({type: "DELETE_LOCATION_REJECTED", payload: err});
    });
  }
}
