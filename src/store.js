import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducers";
/* eslint-env node */
const middlewares = [thunk];

// if (process.env.NODE_ENV === 'development') {
// 	const {createLogger} = require('redux-logger');
// 	const logger = createLogger({
// 		collapsed: () => true
// 	});
// 	middlewares.push(logger);
// }

const enhancer = compose(applyMiddleware(...middlewares));

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  return store;
}