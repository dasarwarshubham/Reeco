import { combineReducers } from "redux";

import orderReducer from "./orders/orderSlice";

const rootReducer = combineReducers({
  orders: orderReducer,
});

export default rootReducer;
