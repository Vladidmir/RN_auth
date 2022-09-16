import { useState, useContext } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../context/auth-context";

import { loginUser } from "../services/auth";

function LoginScreen() {
  const { authenticate } = useContext(AuthContext);
  const [isLoadingUser, setLoadingUser] = useState(false);

  async function loginHandler({ email, password }) {
    setLoadingUser(true);
    try {
      const token = await loginUser(email, password);
      authenticate(token);
      setLoadingUser(false);
    } catch (error) {
      Alert.alert(
        "Authentication faild!",
        "Could not log you in. Please check your credentials! or try again later!"
      );
      setLoadingUser(false);
    }
  }

  if (isLoadingUser) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
