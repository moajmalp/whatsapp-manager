
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard instead of login for better user experience
    navigate("/dashboard");
  }, [navigate]);

  return null;
};

export default Index;
