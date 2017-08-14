import { combineReducers } from "redux";

import students from "./studentsReducer";
import locations from "./locationsReducer";
import user from "./usersReducer";
import {routerReducer} from "react-router-redux";

export default combineReducers({
  user,
  students,
  locations,
  router: routerReducer
});
