import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setisLoggedIn(true);
        setUserObj(user);
      } else {
        setisLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "initializing..."
      )}
      <footer>&copy; {new Date().getFullYear()} Jeff</footer>
    </>
  );
}

export default App;
