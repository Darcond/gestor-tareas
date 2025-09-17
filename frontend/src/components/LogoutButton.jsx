// frontend/src/components/LogoutButton.jsx
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
}
