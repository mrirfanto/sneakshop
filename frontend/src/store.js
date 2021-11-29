import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { productListReducer } from "./reducers/productReducers";

const reducer = combineReducers({
  productList: productListReducer,
});
const initialState = {};
const middleware = [thunk];
const composeEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeWithDevTools;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(...middleware))
);

export default store;
