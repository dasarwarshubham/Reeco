import { createSelector } from "reselect";

const selectOrderSlice = (state) => state.orders;

export const selectAllOrders = createSelector(
  [selectOrderSlice],
  (orderSlice) => orderSlice.orderList
);

export const selectOrderById = createSelector(
  [selectOrderSlice],
  (orderSlice) => orderSlice.orderDetails
);

export const selectLoadingStatus = createSelector(
  [selectOrderSlice],
  (orderSlice) => orderSlice.loading
);

export const selectError = createSelector(
  [selectOrderSlice],
  (orderSlice) => orderSlice.error
);