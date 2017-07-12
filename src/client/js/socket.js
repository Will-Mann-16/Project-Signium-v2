import * as studentsActions from './actions/studentsActions';
import * as locationsActions from './actions/locationsActions';
import io from "socket.io-client";

const HOST_IP = "";

// TODO create house method
export const house = 0;

export const scriptsDirectory = "http://localhost:3000/api/";

export var socket;

export function activateListener(store){
  if(localStorage.getItem("AUTH-TOKEN")){
    socket = io.connect(HOST_IP);
    socket.emit('socket-client-server-init', {house: house, role: "ADMIN", admin: true});
    socket.on('socket-server-client-init', function(){
      socket.on('socket-server-client-redraw-major', response => {
        if(house === response.house){
          store.dispatch(studentsActions.fetchStudentsMajor());
          store.dispatch(locationsActions.fetchLocations());
        }
      });
      socket.on('socket-server-client-redraw-minor', response => {
          if(house === response.house){
            store.dispatch(studentsActions.fetchStudentsMinor());
          }
      });
    });
  }
}
