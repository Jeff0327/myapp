import { authService } from "fbase";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { updateProfile } from "firebase/auth";

const Profile = ({ refreshUser, userObj }) => {
  const navigate = useNavigate();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileform">
        <input
          className="Profile_input"
          onChange={onChange}
          type="text"
          placeholder="  Profile name"
          value={newDisplayName}
        />
        <input
          type="submit"
          value="Update Profile"
          className="Profile_submit"
        />
      </form>
      <button className="Profile_logout" onClick={onLogOutClick}>
        {" "}
        Log out
      </button>
    </div>
  );
};

export default Profile;
