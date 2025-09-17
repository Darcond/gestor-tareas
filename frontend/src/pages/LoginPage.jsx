import React from "react";
import LoginForm from "../components/LoginForm";

export default function LoginPage({ setIsLoggedIn }) {
  return <LoginForm setIsLoggedIn={setIsLoggedIn} />;
}
