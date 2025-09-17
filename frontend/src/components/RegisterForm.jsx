import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({ switchToLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/register", { username, password });
            localStorage.setItem("token", res.data.token);
            navigate("/tasks");
        } catch (err) {
            alert(err.response?.data?.msg || "Error al registrar");
        }
    };

    return (
        <div>
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit}>
                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Usuario"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Contraseña"
                    required
                />
                <button type="submit">Registrarse</button>
            </form>
            <p>
                ¿Ya tienes cuenta?{" "}
                <button onClick={switchToLogin}>Inicia sesión aquí</button>
            </p>
        </div>
    );
}
