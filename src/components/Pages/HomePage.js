import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";

const HomePage = () => {
  const authCtx = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  console.log(authCtx.profileLink);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await authCtx.getProfileData();
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
    return <div>Loading...</div>;
  }
 

  const verifyEmailHandler = async () => {
    try {
      await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBEH8BPvQKDMeJQkL4qDU3zmtoSvKt297Q",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: authCtx.token,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error verifying email:", error.message);
    }
  };

  return (
    <>
      <div>
        <h2>
          <i>Welcome to Expense Tracker</i>
        </h2>
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
        <div>
          <i>
            <Link to="/checkProfile">Click here </Link>to check your profile
          </i>
        </div>
      )}
      <button onClick={verifyEmailHandler}>
        <i>Click here verify your email-id</i>
      </button>
    </>
  );
};

export default HomePage;
