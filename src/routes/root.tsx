import { useEffect, useState } from "react";
import Login from "../components/login/login";

const Root = () => {
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const value = `; ${document.cookie}`;
    const parts = value.split("; access_token=");

    if (parts.length === 2) {
      setAccessToken(parts.pop()?.split(";").shift());
    }
  }, []);

  console.log("access token", accessToken);

  return <>{accessToken ? <div>Logged in</div> : <Login />}</>;
};

export default Root;
