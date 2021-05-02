import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  productsReducers,
  productDetailsReducer,
} from "./reducers/productReducers";

const reducer = combineReducers({
  products: productsReducers,
  productDetails: productDetailsReducer,
});

let initialstate = {};
const middlware = [thunk];
const store = createStore(
  reducer,
  initialstate,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
