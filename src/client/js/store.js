import { applyMiddleware, createStore } from "redux";


import thunk from "redux-thunk";
import {routerMiddleware} from "react-router-redux";

import reducer from "./reducers";

import history from "./history";

const middleware = applyMiddleware(thunk, routerMiddleware(history));

export default createStore(reducer, middleware);
