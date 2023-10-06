import React, { useState } from "react";
import styles from "./NewExpense.module.css";
import ExpenseForm from "./ExpenseForm";
import { useHistory } from "react-router-dom";

const NewExpense = (props) => {
  const history = useHistory();
  // const [showForm, setShowForm] = useState(false);
  const [expenses, setExpenses] = useState([]);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    //console.log(expenseData);
    // props.onAddExpense(expenseData);
    setExpenses((prevExpenses) => [...prevExpenses, expenseData]);
    // setShowForm(false);
  };

  const goBackToHomeHandler = () => {
    history.replace("/home");
  };

  // const showFormHandler = () => {
  //   setShowForm(true);
  // };

  // const collapseFormHandler = () => {
  //   setShowForm(false);
  // };

  return (
    <div className={styles["new-expense"]}>
      {/* {!showForm && <button onClick={showFormHandler}>Add New Expense</button>} */}
        <>
          <ExpenseForm
            onSaveExpenseData={saveExpenseDataHandler}
            // onCancel={collapseFormHandler}
            onGoBack={goBackToHomeHandler}
          />
          <div className={styles["expenses-list"]}>
            <h3 style={{color: "white"}}>My Expenses</h3>
            {expenses.length === 0 ? (
              <p style={{color: "white"}}>No Expenses Found</p>
            ) : (
              <ul>
                {expenses.map((expense) => (
                  <div className={styles.list}>
                  <li key={expense.id}>
                    <div className={styles.expenseList}>
                    <div>{expense.date.toLocaleDateString()}</div>
                    <div><h4>{expense.category}</h4></div>
                    <div>{expense.description}</div>
                    <div>Rs. {expense.amount}</div>
                    </div>
                  </li>
                  </div>
                ))}
              </ul>
            )}
          </div>
        </>
    </div>
  );
};

export default NewExpense;
