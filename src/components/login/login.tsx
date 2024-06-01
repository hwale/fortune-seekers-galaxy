import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FortuneSeekersAPI } from "../../api";
import loginButtonImg640 from "../../assets/login-button-640.webp";
import loginButtonImg768 from "../../assets/login-button-768.webp";
import loginButtonImg1024 from "../../assets/login-button-1024.webp";
import loginButtonImg1280 from "../../assets/login-button-1280.webp";
import loginButtonImg1536 from "../../assets/login-button-1536.webp";

const Login = () => {
  const location = useLocation();
  const { mutate: login, status: loginStatus } =
    FortuneSeekersAPI.Auth.Hooks.useLogin();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code");

    if (code && loginStatus === "idle") {
      login({ exchangeCode: code });
    }
  }, [location, login, loginStatus]);

  const onLoginClick = () => {
    const { protocol, hostname, port } = window.location;
    const baseUrl = `${protocol}//${hostname}${port ? `:${port}` : ""}/`;

    window.location.href = `https://hyplay.com/oauth/authorize/?appId=6ac6d7e7-989e-4dac-9765-f29d98cef802&chain=HYCHAIN_TESTNET&responseType=code&redirectUri=${baseUrl}`;
  };

  return (
    <div className="flex items-center justify-center min-w-[640px] min-h-[480px] bg-[#130e18]">
      <div className="bg-login flex items-center justify-center">
        <button
          type="button"
          className="mt-16 sm:mt-20 md:mt-24 lg:mt-28 xl:mt-32"
          onClick={onLoginClick}
        >
          <picture>
            <source srcSet={loginButtonImg1536} media="(min-width: 1280px)" />
            <source srcSet={loginButtonImg1280} media="(min-width: 1024px)" />
            <source srcSet={loginButtonImg1024} media="(min-width: 768px)" />
            <source srcSet={loginButtonImg768} media="(min-width: 640px)" />
            <img
              src={loginButtonImg640}
              alt="Login"
              className="w-full h-full object-fill"
            />
          </picture>
        </button>
      </div>
    </div>
  );
};

export default Login;
