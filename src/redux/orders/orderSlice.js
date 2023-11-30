import { createSlice } from "@reduxjs/toolkit";
import { retrieveOrders, getOrderById } from "./orderActions";

const isPendingAction = (action) => {
  return action.type.startsWith(`orders/`) && action.type.endsWith("/pending");
};
const isRejectedAction = (action) => {
  return action.type.startsWith(`orders/`) && action.type.endsWith("/rejected");
};

const orderListSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    orderList: [],
    orderDetails: null,
    error: null,
  },
  reducers: {
    updateOrderItemStatus: (state, action) => {
      const { id, status } = action.payload;
      const orderItem = state.orderDetails?.order_items.find((item) => item.id === id);
      if (orderItem) {
        orderItem.status = status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(retrieveOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orderList = action.payload;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
        state.error = null;
      })
      // .addCase(approveProductById.fulfilled, (state, action) => {
      //   state.loading = false;
      //   const { id, status } = action.payload;
      //   const orderItem = state.orderDetails?.order_items.find((item) => item.id === id);
      //   if (orderItem) {
      //     orderItem.status = status;
      //   }
      //   state.error = null;
      // })
      .addMatcher(isPendingAction, (state) => {
        state.loading = true;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addDefaultCase((state) => {
        return state;
      });
  },
});

export const { updateOrderItemStatus } = orderListSlice.actions;
export default orderListSlice.reducer;
