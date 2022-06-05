import React from "react";
import { authService, firebaseInstance } from "fbase";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <div className="AuthContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="5x"
        style={{ marginBottom: 50 }}
      />
      <AuthForm />
      <div className="AuthBtns">
        <button className="AuthBtn" onClick={onSocialClick} name="google">
          Continue with Google
          <FontAwesomeIcon icon={faGoogle} size="1x" color="red" />
        </button>
        <button className="AuthBtn" onClick={onSocialClick} name="github">
          Continue with Github
          <FontAwesomeIcon icon={faGithub} size="1x" color="purple" />
        </button>
      </div>
    </div>
  );
};

export default Auth;
