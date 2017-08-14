import * as studentsActions from './actions/studentsActions';
import * as locationsActions from './actions/locationsActions';
import * as usersActions from './actions/usersActions';
import io from "socket.io-client";

const HOST_IP = "http://localhost:3001";

// TODO create house method
export const house = "5967afdecb778775c45e5be0";

export const scriptsDirectory = "http://localhost:3001/api/";

var socket;
export var connected = false;

export function activateListener(dispatch) {
  socket = io.connect(HOST_IP);
  socket.on('connect', () => {
    connected = true;
    socket.emit('socket-client-server-init', {
      house: house,
      role: "ADMIN",
      admin: true
    });
    socket.on('socket-server-client-init', function() {
      socket.on('socket-server-client-redraw-major', response => {
        if (house === response.house) {
          dispatch(studentsActions.fetchStudentsMajor());
          dispatch(locationsActions.fetchLocations());
        }
      });
      socket.on('socket-server-client-redraw-minor', response => {
        if (house === response.house) {
          dispatch(studentsActions.fetchStudentsMinor());
        }
      });
    });
  });
}

export function emit(value, packet = {}) {
  if (connected) {
    socket.emit(value, packet);
  }
}
