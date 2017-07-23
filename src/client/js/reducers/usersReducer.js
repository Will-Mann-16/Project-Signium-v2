export default function reducer(state={
  user: {},
  fetching: false,
  fetched: false,
  authenticated: false,
  error: null
}, action){

  switch(action.type){
    case "USER_LOGIN_REQUEST":{
      return {...state, fetching: true, fetched: false};
    }
    case "USER_LOGIN_REQUEST_FULFILLED":{
      return {...state, fetching: false, fetched: true, authenticated: true};
    }
    case "USER_LOGIN_REQUEST_DENIED":{
      return {...state, fetching: false, fetched: true, authenticated: false};
    }
    case "USER_LOGIN_REQUEST_REJECTED":{
      return {...state, fetching: false, error: action.payload};
    }

    case "USER_LOGOUT_REQUEST":{
      return {...state, fetching: true, fetched: false};
    }
    case "USER_LOGOUT_REQUEST_FULFILLED":{
      return {...state, fetching: false, user: {}};
    }
    case "USER_LOGOUT_REQUEST_REJECTED":{
      return {...state, fetching: false, error: action.payload};
    }

    case "USER_FETCH_DATA":{
      return {...state, fetching: true, fetched: false};
    }
    case "USER_FETCH_DATA_FULFILLED":{
      return {...state, fetching: false, fetched: true, user: action.payload, authenticated: true};
    }
    case "USER_FETCH_DATA_REJECTED":{
      return {...state, fetching: false, error: action.payload};
    }


        default:{
          return state;
        }
  }
}
