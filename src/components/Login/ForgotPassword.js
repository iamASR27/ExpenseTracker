import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import { useHistory } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBEH8BPvQKDMeJQkL4qDU3zmtoSvKt297Q",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      history.replace("/login");
    } catch (error) {
      console.error("Error sending password reset link: ", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  return (
    <section className={styles.forgotSection}>
      <form onSubmit={handleForgotPassword}>
        <div className={styles.forgotPassword}>
          <label>Enter the email with which you have registered</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={emailChangeHandler}
            required
          />
        </div>
        <button type="submit">Send Link</button>
      </form>
    </section>
  );
};

export default ForgotPassword;
