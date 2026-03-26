import { logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Weather from "../UserPages/Weather";
import CropPrediction from "../UserPages/CropPrediction";
import FertilizerPrediction from "../UserPages/FertilizerPrediction";
import CropPrice from "../UserPages/CropPrice";
import CropYield from "../UserPages/CropYield";

export default function Dashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let user = null;

  if (token) {
    user = jwtDecode(token);
  }

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <h3>Welcome, {user?.name} 👋</h3>

      <button onClick={handleLogout}>
        Logout
      </button>

      <Weather />
      <CropPrediction />
      <FertilizerPrediction />
      <CropPrice />
      <CropYield />
    </div>
  );
}