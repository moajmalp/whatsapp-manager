
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login instead of directly to dashboard
    navigate("/login");
  }, [navigate]);

  return null;
};

export default Index;
