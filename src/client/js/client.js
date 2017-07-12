import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./components/App";
import store from "./store";
import {activateListener} from "./socket";

const app = document.getElementById('app');
activateListener(store);
ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>
, app);
