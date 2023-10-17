import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import styles from "./HomePage.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const HomePage = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  // console.log(authCtx.profileLink);

  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await authCtx.getProfileData();
        // console.log(data)
        const user = data.users[0];
        const displayName = user.displayName;
        const photoUrl = user.photoUrl;

        if(displayName && photoUrl){
          authCtx.setProfileLink();
        }
        setLoading(false);
      
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [authCtx]);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  const verifyEmailHandler = async () => {
    console.log("verify email");
    try {
      await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBEH8BPvQKDMeJQkL4qDU3zmtoSvKt297Q",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("verify email sent");
    } catch (error) {
      console.error("Error verifying email:", error.message);
    }
  };

  const logoutButtonHandler = () => {
    // authCtx.logout();
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("darkMode");
    localStorage.removeItem("premiumState");
    localStorage.removeItem("userId");
  }

  const manageExpenseHandler = () => {
    history.replace("/expenses");
  };

  const profileHandler = () => {
    history.replace("/checkProfile");
  }

  return (
    <>
    <div className={styles.home}>
      <div className={styles.header}>
        <h2>
          <i>Welcome to Expense Tracker</i>
        </h2>
        <button className={styles.logout} onClick={logoutButtonHandler}>Logout</button>
      </div>
      {!authCtx.profileLink && (
        <div>
          <i>
            Your profile is incomplete.
            <Link to="/updateProfile">Complete now</Link>
          </i>
        </div>
      )}
      {authCtx.profileLink && (
        <button className={styles.profileButton} onClick={profileHandler}>
          <i>
            Click here to check your profile
          </i>
        </button>
      )}
      <div className={styles.home_buttons}>
      <button className={styles.verify} onClick={verifyEmailHandler}>
        <i>Click here verify your email-id</i>
      </button>
      <button className={styles.expenses} onClick={manageExpenseHandler}><i>Manage your expenses</i></button>
      </div>
      </div>
    </>
  );
};

export default HomePage;
