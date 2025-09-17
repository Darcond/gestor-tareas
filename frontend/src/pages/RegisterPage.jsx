import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
    return <RegisterForm switchToLogin={() => window.location.href = "/login"} />;
}
