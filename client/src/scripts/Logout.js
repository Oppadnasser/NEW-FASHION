import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LogOut() {
  const navigate = useNavigate();

  useEffect(() => {
    const Logout = () => {
      axios
        .get("http://localhost:3000/logout", { withCredentials: true })
        .then(() => {
          const hiddenItems = document.querySelectorAll(".hidden-content");
          hiddenItems.forEach((item) => {
            item.style.display = "none";
          });
          const showedItem = document.querySelector(".showed-content");
          showedItem.style.display = "block";
          const admin = document.querySelector(".admin-register-text");
          admin.style.display = "none";
          const seller = document.querySelector(".seller-content");
          seller.style.display = "none";
          navigate("/");
        })
        .catch((error) => {
          console.error("Logout failed:", error);
        });
    };

    Logout(); // Call the Logout function when the component loads
  }, [navigate]); // The empty array ensures this runs only once on component mount

  return <div>Logging out...</div>;
}
