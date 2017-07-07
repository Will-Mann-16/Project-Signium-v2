import { combineReducers } from "redux";

import students from "./studentsReducer";
import locations from "./locationsReducer";
import user from "./usersReducer";

export default combineReducers({
  students,
  locations,
  user
});
