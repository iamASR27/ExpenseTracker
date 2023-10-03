import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import styles from "./CheckProfile.module.css";

const CheckProfile = () => {
  const { getProfileData } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(null);
  const history = useHistory();

  const updateButtonHandler = () => {
    history.replace("/updateProfile");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfileData();
        setProfileData(data);
        // authCtx.setProfileLink();
      } catch (error) {
        console.error("Error fetching profile data:", error.message);
      }
    };

    fetchData();
  }, [getProfileData]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const user = profileData.users[0];
  const displayName = user.displayName;
  const photoUrl = user.photoUrl;

  return (
    <div className={styles["profile-container"]}>
      <div className={styles["profile-data"]}>
        <div>
          <b>Your Name:</b> {displayName}
        </div>
        <div>
          <b>Profile Photo Url:</b> {photoUrl}
        </div>
      </div>
      <button className={styles["update-button"]} onClick={updateButtonHandler}>
        Update Profile
      </button>
    </div>
  );
};

export default CheckProfile;
