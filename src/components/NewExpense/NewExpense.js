import React, { useEffect, useState, useCallback } from "react";
import ExpenseForm from "./ExpenseForm";
import { useHistory } from "react-router-dom";
import styles from "./NewExpense.module.css";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expense";

const NewExpense = () => {
  const history = useHistory();
  // const [expenses, setExpenses] = useState([]);
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expense.expenses);
  const [editedExpense, setEditedExpense] = useState(null);

  const saveExpenseDataHandler = useCallback(async () => {
    console.log("fetch expenses");
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
        // console.log("keys: ", key)
        loadedExpenses.push({
          id: key,
          ...responseData[key],
        });
      }
      // console.log(loadedExpenses);
      // setExpenses(loadedExpenses);
      dispatch(expenseActions.setExpenses(loadedExpenses));
    } catch (error) {
      console.error("Error fetching expenses:", error.message);
    }

    // setExpenses((prevExpenses) => [...prevExpenses, enteredExpenseData]);
  }, [dispatch]);

  useEffect(() => {
    saveExpenseDataHandler();
  }, [saveExpenseDataHandler]);

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
      console.log("Expense successfuly deleted");
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

  const calculateTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const totalExpenses = calculateTotalExpenses();

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
        {totalExpenses > 10000 && (
          <button
            style={{
              background:
                "linear-gradient(to right, rgb(165 145 38) 0%, rgb(221 194 50) 50%, rgb(165 145 38) 100%)",
              marginTop: "5px",
            }}
            onMouseOver={(e) => e.target.style.background =  "linear-gradient(to right, rgb(183 157 16) 0%, rgb(199 171 23) 50%, rgb(195 164 2) 100%)"}
            onMouseOut={(e) => e.target.style.background = "linear-gradient(to right, rgb(165 145 38) 0%, rgb(221 194 50) 50%, rgb(165 145 38) 100%)"}
          >
            Activate Premium
          </button>
        )}
        <div className={styles["expenses-list"]}>
          <h3 style={{ color: "white", marginTop: "5px" }}>My Expenses</h3>
          {expenses.length === 0 ? (
            <p style={{ color: "white" }}>No Expenses Found</p>
          ) : (
            <ul className={styles.list}>
              {expenses.map((expense) => (
                <li key={expense.id}>
                  <div className={styles.expenseList}>
                    <div className={styles.expenseItem_date}>
                      <div>{expense.date}</div>
                    </div>
                    <div className={styles.expenseItem}>
                      <h4>{expense.category}</h4>
                    </div>
                    <div className={styles.expenseItem}>
                      <div>{expense.description}</div>
                    </div>
                    <div className={styles.expenseItem}>
                      <div>Rs. {expense.amount}</div>
                    </div>
                    <div className={styles.expenseItemButton}>
                      <div>
                        <button onClick={() => editExpenseHandler(expense)}>
                          Edit
                        </button>
                        <button
                          onClick={() => removeExpenseHandler(expense.id)}
                        >
                          Delete
                        </button>
                      </div>
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
