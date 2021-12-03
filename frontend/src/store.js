import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import { userLoginReducer } from "./reducers/userReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : [];
const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
  },
  userLogin: {
    userInfo: userInfoFromLocalStorage,
  },
};
const middleware = [thunk];
const composeEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeWithDevTools;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(...middleware))
);

export default store;
