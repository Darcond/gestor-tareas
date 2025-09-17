import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function LoginPage() {
    const [showRegister, setShowRegister] = useState(false);

    return showRegister ? (
        <RegisterForm switchToLogin={() => setShowRegister(false)} />
    ) : (
        <LoginForm switchToRegister={() => setShowRegister(true)} />
    );
}
