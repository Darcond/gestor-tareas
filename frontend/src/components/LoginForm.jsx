import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ switchToRegister, setIsLoggedIn }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", { username, password });
            localStorage.setItem("token", res.data.token);
            setIsLoggedIn(true);
            navigate("/tasks");
        } catch (err) {
            alert(err.response?.data?.msg || "Error al iniciar sesión");
        }
    };

    return (
        <div>
            <h2>Iniciar sesión</h2>
            <form onSubmit={handleSubmit}>
                <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuario" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
                <button type="submit">Iniciar sesión</button>
            </form>
            <p>¿No tienes cuenta? <button onClick={switchToRegister}>Regístrate aquí</button></p>
        </div>
    );
}
