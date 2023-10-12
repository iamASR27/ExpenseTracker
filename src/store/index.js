import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expense";
import authReducer from "./auth";

const store = configureStore({
  reducer: { auth: authReducer, expense: expenseReducer },
});



export default store;
