import { useEffect, useState } from "react";
import Login from "./login";
import { useNavigate } from "react-router-dom";

const Root = () => {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const value = `; ${document.cookie}`;
    const parts = value.split("; access_token=");

    if (parts.length === 2) {
      setAccessToken(parts.pop()?.split(";").shift());
    } else {
      navigate("/login");
    }
  }, []);

  console.log("access token", accessToken);

  return <>{accessToken ? <div>Logged in</div> : <Login />}</>;
};

export default Root;
