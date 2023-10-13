import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./expense";
import authReducer from "./auth";
import themeReducer from "./theme";

const store = configureStore({
  reducer: { auth: authReducer, expense: expenseReducer, theme: themeReducer },
});



export default store;
