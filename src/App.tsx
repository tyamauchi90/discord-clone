import "./App.scss";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import Sidebar from "./components/Sidebar";
import Chat from "./components/chat/Chat";
import Login from "./components/login/Login";
import { login, logout } from "./features/userSlice";
import { auth } from "./firebase";
import { ErrorFallBack } from "./utils/ErrorFallBack";
import React, { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

function App() {
  const user = useAppSelector((state) => state.user);
  // const user = null;

  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((loginUser) => {
      if (loginUser) {
        dispatch(
          login({
            uid: loginUser.uid,
            photo: loginUser.photoURL,
            email: loginUser.email,
            displayName: loginUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      {user ? (
        <>
          <ErrorBoundary FallbackComponent={ErrorFallBack}>
            <Sidebar />
          </ErrorBoundary>
          <Chat />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}

export default App;
