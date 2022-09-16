import { useState, useContext } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";

import { AuthContext } from "../context/auth-context";
import { createUser } from "../services/auth";

function SignupScreen() {
  const { authenticate } = useContext(AuthContext);
  const [isLoadingUser, setLoadingUser] = useState(false);

  async function sigupHandler({ email, password }) {
    try {
      setLoadingUser(true);
      const token = await createUser(email, password);
      authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not create, user please check your input and try again later."
      );
      setLoadingUser(false);
    }
  }

  if (isLoadingUser) {
    return <LoadingOverlay message="Creating user..." />;
  }

  return <AuthContent onAuthenticate={sigupHandler} />;
}

export default SignupScreen;
