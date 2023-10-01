import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import AuthContext from "../../store/auth-context";
import styles from "./UpdateProfilePage.module.css";

const UpdateProfilePage = () => {
  const { token, setProfileLink } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    fullname: "",
    photoURL: "",
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const history = useHistory();

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    // console.log(name, value)
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };
  const cancelHandler = () => {
    history.replace("/home");
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(profileData)
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBEH8BPvQKDMeJQkL4qDU3zmtoSvKt297Q",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: profileData.fullname,
            photoUrl: profileData.photoURL,
            // deleteAttribute: ["DISPLAY_NAME", "PHOTO_URL"],  //["DISPLAY_NAME", "PHOTO_URL"]
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        throw new Error("Failed to update!");
      }
      setShowSuccessMessage(true);
      setProfileData({
        fullname: "",
        photoURL: "",
      });
     setProfileLink();

    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  // useEffect(() => {
  //     try {
  //       const data =  authCtx.getProfileData();
  //       setProfileData({
  //         fullname: data.displayName || "",
  //         photoURL: data.photoUrl || "", 
  //       });
  //     } catch (error) {
  //       console.error("Error fetching profile data:", error.message);
  //     }
  // }, [authCtx]);

  useEffect(() => {
    if (showSuccessMessage) {
      let timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  return (
    <div className={styles["form-container"]}>
    <form onSubmit={submitHandler}>
      <div className={styles["contact-details"]}>
        <h4>Contact Details</h4>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
      </div>
      <div className={styles.data}>
        <label htmlFor="fullname">Full Name: </label>
        <input type="text" id="fullname" name="fullname" onChange={inputChangeHandler} />
        <label htmlFor="photoURL">Profile Photo URL: </label>
        <input type="url" id="photoURL" name="photoURL" onChange={inputChangeHandler} />
      </div>
      <div className={styles.update}>
        <button type="submit">Update</button>
      </div>
      {showSuccessMessage && (
        <Alert variant="success" className="mt-3">
          Your Profile is updated successfully.
        </Alert>
      )}
    </form>
    </div>
  );
};

export default UpdateProfilePage;
