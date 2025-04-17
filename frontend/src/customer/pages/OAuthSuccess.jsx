import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function OAuthSuccessPage() {
  const { loginSuccess } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/getMe`, {
      credentials: "include" // carry cookie!
    })
      .then((res) => res.json())
      .then((data) => {
        const { user, token } = data;
        loginSuccess(user, token);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        navigate("/");
      });
  }, []);

  return <p>Logging you in...</p>;
}
