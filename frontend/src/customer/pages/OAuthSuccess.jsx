import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function OAuthSuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");


    if (token && name && email) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ name, email }));
        // back to home page
        navigate("/");
      }
  }, []);

  return <div>Logging in...</div>;
}
