import React, { useState } from "react";
import { authService } from "fbase";
const AuthForm = () => {
  const [newAccout, setNewAccout] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const toggleAccount = () => setNewAccout((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;

      if (newAccout) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
        />
        <input
          onChange={onChange}
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
        />
        <input type="submit" value={newAccout ? "Create Accout" : "Sign in"} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccout ? "Sign in" : "Create Accout"}
      </span>
    </>
  );
};
export default AuthForm;
