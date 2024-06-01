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
  }, [status]);

  if (status === "success") return <div>Logged In</div>;

  return <div>You don't belong here</div>;
};

export default Root;
