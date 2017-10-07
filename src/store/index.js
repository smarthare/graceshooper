import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import ReduxPromise from "redux-promise";
import thunkMiddleware from "redux-thunk";

import reducers from "../reducers";

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware, ReduxPromise, createLogger())
  )
);

export default store;
