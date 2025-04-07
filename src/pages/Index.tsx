
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to channels page for our demo
    navigate("/channels");
  }, [navigate]);

  return null;
};

export default Index;
