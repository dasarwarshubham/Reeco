import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllOrders, getOrderDetailsWithId } from "../../services/orderAPI";

const retrieveOrders = createAsyncThunk("orders/fetchAll", async () => {
  const response = await getAllOrders();
  return response;
});

const getOrderById = createAsyncThunk("orders/fetchById", async (id) => {
  const response = await getOrderDetailsWithId(id);
  return response;
});


export { retrieveOrders, getOrderById };
