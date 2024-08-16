import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { jwtDecode } from "jwt-decode";
import {
  AuthState,
  ExtendedJwtPayload,
  login,
  logout,
} from "../../redux/slice/authSlice";
import { Box, Button } from "@mui/material";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

const Login = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    console.log("client id : ", process.env.REACT_APP_AUTH_CLIENT_ID);
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_AUTH_CLIENT_ID,
        callback: handleLoginSuccess,
      });
    }
  }, []);

  function handleLoginSuccess(
    credentialResponse: google.accounts.id.CredentialResponse
  ) {
    const authData = jwtDecode<ExtendedJwtPayload>(
      credentialResponse.credential
    );
    console.log(authData);
    console.log(JSON.stringify(authData));
    if (authData.jti) {
      const loginData: AuthState = {
        authData,
        token: authData.jti,
      };
      dispatch(login(loginData));
    }
  }

  function handleLogin() {
    console.log("handleLogin");
    window.google.accounts.id.prompt();
  }

  function handleLogout() {
    dispatch(logout());
  }
  return (
    <Box>
      {userInfo.token && userInfo.authData ? (
        <Button
          variant="contained"
          endIcon={<LogoutRoundedIcon />}
          onClick={handleLogout}
        >
          {userInfo.authData.given_name} 로그아웃
        </Button>
      ) : (
        <Button
          variant="contained"
          endIcon={<LoginRoundedIcon />}
          onClick={handleLogin}
        >
          Google Login
        </Button>
      )}
    </Box>
  );
};

export default Login;
