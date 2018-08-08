import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { connectRouter, routerMiddleware } from "connected-react-router";
import rootReducer from "./reducers";

export default history => createStore(
  connectRouter(history)(rootReducer),
  composeWithDevTools(applyMiddleware(routerMiddleware(history))),
);
