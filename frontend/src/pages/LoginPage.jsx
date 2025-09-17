import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function LoginPage({ setIsLoggedIn }) {
    const [showRegister, setShowRegister] = useState(false);

    return showRegister ? (
        <RegisterForm switchToLogin={() => setShowRegister(false)} setIsLoggedIn={setIsLoggedIn} />
    ) : (
        <LoginForm switchToRegister={() => setShowRegister(true)} setIsLoggedIn={setIsLoggedIn} />
    );
}
