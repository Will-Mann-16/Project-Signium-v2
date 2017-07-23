export default function reducer(state={
  students: [],
  selected: [],
  fetching: false,
  fetched: false,
  error: null
}, action){

  switch(action.type){
    case "FETCH_STUDENTS_MAJOR":{
      return {...state, fetching: true, fetched: false};
    }
    case "FETCH_STUDENTS_MAJOR_REJECTED":{
      return {...state, fetching: false, error: action.payload};
    }
    case "FETCH_STUDENTS_MAJOR_FULFILLED": {
      return {...state, fetching: false, fetched: true, students: action.payload};
    }

    case "FETCH_STUDENTS_MINOR":{
      return {...state, fetching: true, fetched: false};
    }
    case "FETCH_STUDENTS_MINOR_REJECTED":{
      return {...state, fetching: false, error: action.payload};
    }
    case "FETCH_STUDENTS_MINOR_FULFILLED": {
      var newStudents = action.payload;
      var students = state. students;
      for(var i = 0; i < state.students.length; i++){
        students[i].location = newStudents[i].location;
      }
      return {...state, fetching: false, fetched: true, students: students};
    }

    case "SELECT_STUDENT":{
      var selected = state.selected;
      selected.push(action.payload);
      return {...state, selected: selected};
    }
    case "DESELECT_STUDENT":{
      var selected = state.selected;
      var indexOf = selected.indexOf(action.payload);
      selected.splice(indexOf)
      return {...state, selected: selected};
    }

    case "ADD_STUDENT":{
      return {...state, fetching: true, fetched: false};
    }
    case "ADD_STUDENT_REJECTED":{
      return {...state, fetching: false, error: action.payload};
    }
    case "ADD_STUDENT_FULFILLED": {
      return {...state, fetching: false, fetched: true};
    }

    case "UPDATE_STUDENT":{
      return {...state, fetching: true, fetched: false};
    }
    case "UPDATE_STUDENT_REJECTED":{
      return {...state, fetching: false, error: action.payload};
    }
    case "UPDATE_STUDENT_FULFILLED": {
      return {...state, fetching: false, fetched: true};
    }

    case "UPDATE_STUDENT_LOCATION":{
      return {...state, fetching: true, fetched: false};
    }
    case "UPDATE_STUDENT_LOCATION_REJECTED":{
      return {...state, fetching: false, error: action.payload};
    }
    case "UPDATE_STUDENT_LOCATION_FULFILLED": {
      return {...state, fetching: false, fetched: true};
    }

    case "DELETE_STUDENT":{
      return {...state, fetching: true, fetched: false};
    }
    case "DELETE_STUDENT_REJECTED":{
      return {...state, fetching: false, error: action.payload};
    }
    case "DELETE_STUDENT_FULFILLED": {
      return {...state, fetching: false, fetched: true};
    }


        default:{
          return state;
        }
  }
}
