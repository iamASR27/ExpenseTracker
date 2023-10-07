import React, { useState } from "react";
import styles from "./ExpenseForm.module.css";

const ExpenseForm = (props) => {
  const [userInput, setUserInput] = useState({
    amount: "",
    description: "",
    date: "",
    category: "Food",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log("submit")
    const expenseData = {
      category: userInput.category,
      amount: +userInput.amount,
      date: new Date(userInput.date).toLocaleDateString(),
      description: userInput.description,
    };
    //console.log(expenseData);

    try {
      const response = await fetch(
        "https://expensetracker-1d4cf-default-rtdb.firebaseio.com/expensedata.json",
        {
          method: "POST",
          body: JSON.stringify(expenseData),
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add expense.");
      }
      // const responseData = await response.json();
      // const expenseIdFromFirebase = responseData.name;
      // console.log(responseData);

      props.onSaveExpenseData();
      console.log("add")
    } catch (error) {
      console.error("Error adding expense:", error.message);
    }

    setUserInput({
      amount: "",
      description: "",
      date: "",
      category: "Food",
    });
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles["expense-form"]}>
        <div className={styles["expense-form-input"]}>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={userInput.category}
            onChange={handleInputChange}
          >
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="Grocery">Grocery</option>
            <option value="Movies">Movies</option>
          </select>
        </div>
        <div className={styles["expense-form-input"]}>
          <label>Expense Amount</label>
          <input
            type="number"
            min="1"
            step="1"
            value={userInput.amount}
            name="amount"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles["expense-form-input"]}>
          <label>Description</label>
          <input
            type="text"
            value={userInput.description}
            name="description"
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles["expense-form-input"]}>
          <label>Date</label>
          <input
            type="date"
            min="2023-01-01"
            value={userInput.date}
            name="date"
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className={styles["expense-submit"]}>
        <button type="submit">Add Expense</button>
        {/* <button type="button" onClick={props.onCancel}>Cancel</button> */}
        <button type="button" onClick={props.onGoBack}>
          Go back to homepage
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
