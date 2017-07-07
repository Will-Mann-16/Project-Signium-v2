import * as studentsActions from './actions/studentsActions';
import io from "socket.io-client";

const HOST_IP = "";

// TODO create house method
export const house = "benson";

export const scriptsDirectory = "php/"

export const socket = io.connect(HOST_IP);

export function activateListener(store){
  socket.on('server-socket-redraw-all', response => {
    if(house === response.house){
      store.dispatch(studentsActions.fetchAllStudents());
    }
  });
  socket.on('server-socket-redraw', response => {
      if(house === response.house){
        store.dispatch(studentsActions.fecthStudents(response.ids));
      }
  });
}
