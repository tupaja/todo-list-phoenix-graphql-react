import { combineReducers } from "redux";
import { CHANGE_DEPENDENCIES } from "actions/todo";

const dependencies = (state = [], action) => {
  switch (action.type) {
    case CHANGE_DEPENDENCIES:
      return action.values;
    default:
      return state;
  }
};

export default combineReducers({ dependencies });
