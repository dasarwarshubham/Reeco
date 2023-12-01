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
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.orderDetails?.order_items.find(
        (orderItem) => orderItem?.id === item.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.orderDetails.order_items.push({
          ...item,
          quantity: 1,
          total: item.price * 1,
          status: null,
          comment: null
        });
      }
    },
    updateItem: (state, action) => {
      const updatedOrderItem = action.payload;
      const orderItemIndex = state.orderDetails?.order_items.findIndex((item) => item.id === updatedOrderItem.id);
      if (orderItemIndex !== -1) {
        state.orderDetails.order_items[orderItemIndex] = { ...updatedOrderItem };
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

export const { addItem, updateItem } = orderListSlice.actions;
export default orderListSlice.reducer;
