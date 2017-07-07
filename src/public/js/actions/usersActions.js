import axios from "axios";
import { scriptsDirectory } from "./../socket.js";

export function requestLogin(creds){
  return function(dispatch){
    dispatch({type: "USER_LOGIN_REQUEST"});
    axios.post(scriptsDirectory + "authLogin.php", {params: { Credentials: creds }}).then((response) =>{
      if(!response.data.success){
        dispatch({type: "USER_LOGIN_REQUEST_DENIED", payload: false});
      }
      else{
        localStorage.setItem("jwt_token", response.data.jwt_token);
        dispatch({type: "USER_LOGIN_REQUEST_FULFILLED", payload: true});
      }
    }).catch((err) =>{
      dispatch({type: "USER_LOGIN_REQUEST_REJECTED", payload: err});
    });
  }
}

export function requestLogout(){
  return function(dispatch){
    dispatch({type: "USER_LOGOUT_REQUEST"});
    localStorage.removeItem("jwt_token").then(() => {
      dispatch({type: "USER_LOGOUT_REQUEST_FULFILLED", payload: true});
    }).catch((err) =>{
      dispatch({type: "USER_LOGOUT_REQUEST_REJECTED", payload: err});
    });
  }
}

export function fetchUserData(){
  return function(dispatch){
    dispatch({type: "USER_FETCH_DATA"});
    axios.post(scriptsDirectory + "fetchUserData.php", {params: { Token: localStorage.getItem("jwt_token") }}).then((response) =>{
        dispatch({type: "USER_FETCH_DATA_FULFILLED", payload: response.data});
    }).catch((err) =>{
      dispatch({type: "USER_FETCH_DATA_REJECTED", payload: err});
    });
  }
}
