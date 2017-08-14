export default function reducer(state={
  locations: [],
  fetching: false,
  fetched: false,
  error: null
}, action){
  switch(action.type){
    case "FETCH_LOCATIONS":{
      return {...state, fetching: true, fetched: false};
    }
    case "FETCH_LOCATIONS_REJECTED":{
      return {...state, fetching: false, error: action.payload};
    }
    case "FETCH_LOCATIONS_FULFILLED": {
      return {...state, fetching: false, fetched: true, locations: action.payload};
    }

    case "ADD_LOCATION":{
      return {...state, fetching: true, fetched: false};
    }
    case "ADD_LOCATION_REJECTED":{
      return {...state, fetching: false, error: action.payload};
    }
    case "ADD_LOCATION_FULFILLED": {
      return {...state, fetching: false, fetched: true};
    }

    case "UPDATE_LOCATION":{
      return {...state, fetching: true, fetched: false};
    }
    case "UPDATE_LOCATION_REJECTED":{
      return {...state, fetching: false, error: action.payload};
    }
    case "UPDATE_LOCATION_FULFILLED": {
      return {...state, fetching: false, fetched: true};
    }

    case "DELETE_LOCATION":{
      return {...state, fetching: true, fetched: false};
    }
    case "DELETE_LOCATION_REJECTED":{
      return {...state, fetching: false, error: action.payload};
    }
    case "DELETE_LOCATION_FULFILLED": {
      return {...state, fetching: false, fetched: true};
    }

    default:{
      return state;
    }
  }
}
