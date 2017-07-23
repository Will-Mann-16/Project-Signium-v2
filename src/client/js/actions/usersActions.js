/*jshint esversion: 6 */
import axios from "axios";
import { scriptsDirectory } from "./../socket.js";

export function requestLogin(username, password, remember){
  return dispatch => {
    dispatch({type: "USER_LOGIN_REQUEST"});
    axios.post(scriptsDirectory + "users/authenticate", {params: {username: username, password: password, remember: remember}}).then((response) =>{
      if(response.data.success){
        if(!response.data.authenticated){
          dispatch({type: "USER_LOGIN_REQUEST_DENIED", payload: false});
        }
        else{
          localStorage.setItem("AUTH-TOKEN", response.data.token);
          dispatch({type: "USER_LOGIN_REQUEST_FULFILLED", payload: true});
        }
      }
        else{
          dispatch({type: "USER_LOGIN_REQUEST_REJECTED", payload: response.data.reason});
        }

    }).catch((err) =>{
      dispatch({type: "USER_LOGIN_REQUEST_REJECTED", payload: err});
    });
  };
}

export function requestLogout(){
  return dispatch => {
    dispatch({type: "USER_LOGOUT_REQUEST"});
    localStorage.removeItem("AUTH-TOKEN").then(() => {
      dispatch({type: "USER_LOGOUT_REQUEST_FULFILLED", payload: true});
    }).catch((err) =>{
      dispatch({type: "USER_LOGOUT_REQUEST_REJECTED", payload: err});
    });
  };
}

export function fetchUserData(){
  return dispatch => {
    dispatch({type: "USER_FETCH_DATA"});
    axios.post(scriptsDirectory + "users/read", {params: { jwt: localStorage.getItem("AUTH-TOKEN") }}).then((response) =>{
        if(response.data.success){
          dispatch({type: "USER_FETCH_DATA_FULFILLED", payload: response.data.user});
        }else{
          disatch({type: "USER_FETCH_DATA_REJECTED", payload: response.data.reason});
        }
    }).catch((err) =>{
      dispatch({type: "USER_FETCH_DATA_REJECTED", payload: err});
    });
  };
}
