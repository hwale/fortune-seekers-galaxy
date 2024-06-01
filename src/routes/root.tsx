import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FortuneSeekersAPI } from "../api";

const Root = () => {
  const navigate = useNavigate();
  const { status } = FortuneSeekersAPI.Auth.Hooks.useCheckAuth();

  useEffect(() => {
    if (status === "error") {
      navigate("/login");
    }
  }, [status, navigate]);

  if (status === "success") return <div>Logged In</div>;

  return <div>Checking Auth...</div>;
};

export default Root;
