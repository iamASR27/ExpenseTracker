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

      downloadExpenses (state) {
        let csvContent = "date,category,description,amount\n";

        state.expenses.forEach((expense) =>{
          const row = `${expense.date},${expense.category},"${expense.description}",${expense.amount}\n`;
          csvContent += row;
        });

        const blob = new Blob([csvContent]);
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "expenses.csv";

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;
