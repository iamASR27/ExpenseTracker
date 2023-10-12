import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
    expenses: [],
};

const expenseSlice = createSlice({
    name: 'expense',
    initialState: initialExpenseState,
    reducers: {
      setExpenses (state, action) {
        state.expenses = action.payload;
      },
    },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
