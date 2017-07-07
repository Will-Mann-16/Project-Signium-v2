export default function reducer(state={
  students: [],
  fetching: false,
  fetched: false,
  error: null
}, action){

  switch(action.type){
    case "FETCH_ALL_STUDENTS":{
      return {...state, fetching: true, fetched: false};
    }
    case "FETCH_ALL_STUDENTS_REJECTED":{
      return {...state, fetching: false, error: action.payload};
    }
    case "FETCH_ALL_STUDENTS_FULFILLED": {
      return {...state, fetching: false, fetched: true, students: action.payload};
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
  }
}
