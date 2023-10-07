import React, { useEffect, useState } from "react";
import ExpenseForm from "./ExpenseForm";
import { useHistory } from "react-router-dom";
import styles from "./NewExpense.module.css";

const NewExpense = () => {
  const history = useHistory();
  const [expenses, setExpenses] = useState([]);
  const [editedExpense, setEditedExpense] = useState(null);

  const saveExpenseDataHandler = async () => {
    console.log("fetch expenses")
    try {
      const response = await fetch(
        "https://expensetracker-1d4cf-default-rtdb.firebaseio.com/expensedata.json"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch expenses.");
      }

      const responseData = await response.json();
      const loadedExpenses = [];

      for (const key in responseData) {
        loadedExpenses.push({
          id: key,
          ...responseData[key],
        });
      }

      setExpenses(loadedExpenses);
    } catch (error) {
      console.error("Error fetching expenses:", error.message);
    }

   
    // setExpenses((prevExpenses) => [...prevExpenses, enteredExpenseData]);
 
  };

  useEffect(() => {
    saveExpenseDataHandler();
  }, [])

  const goBackToHomeHandler = () => {
    history.replace("/home");
  };

  const removeExpenseHandler = async (expenseId) => {
    try {
      const response = await fetch(
        `https://expensetracker-1d4cf-default-rtdb.firebaseio.com/expensedata/${expenseId}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove expense.");
      }

      await saveExpenseDataHandler(); // Fetch updated expenses after removing one
      console.log("Expense successfuly deleted")
    } catch (error) {
      console.error("Error removing expense:", error.message);
    }
  };

  const editExpenseHandler = (expense) => {
    setEditedExpense(expense);
  };

  const clearEditedExpenseHandler = () => {
    setEditedExpense(null);
  };

  return (
    <div className={styles["new-expense"]}>
        <>
          <ExpenseForm
            onSaveExpenseData={saveExpenseDataHandler}
            editedExpense={editedExpense}
            onSaveChanges={clearEditedExpenseHandler}
            // onCancel={collapseFormHandler}
            onGoBack={goBackToHomeHandler}
          />
          <div className={styles["expenses-list"]}>
            <h3 style={{color: "white"}}>My Expenses</h3>
            {expenses.length === 0 ? (
              <p style={{color: "white"}}>No Expenses Found</p>
            ) : (
              <ul className={styles.list}>
                {expenses.map((expense) => (
                  <li key={expense.id}>
                    <div className={styles.expenseList}>
                    <div>{expense.date}</div>
                    <div><h4>{expense.category}</h4></div>
                    <div>{expense.description}</div>
                    <div>Rs. {expense.amount}</div>
                    <div>
                    <button onClick={() => editExpenseHandler(expense)}>Edit</button>
                    <button onClick={() => removeExpenseHandler(expense.id)}>Delete</button>
                    </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
    </div>
  );
};

export default NewExpense;
