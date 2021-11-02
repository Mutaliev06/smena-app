import { applyMiddleware, combineReducers, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import { usersReducer } from "./features/users";
import { application } from './features/application';
import { composeWithDevTools } from 'redux-devtools-extension';

const logger = createLogger({
  collapsed: true,
  diff: true,
});

export const store = createStore(
  combineReducers({
    users: usersReducer,
    application: application,
  }), composeWithDevTools(
    applyMiddleware(thunk, logger)
  )
);
