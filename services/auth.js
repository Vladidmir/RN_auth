import axios from "axios";

const API_KEY = "AIzaSyB_CBGAYzu1k008BgsczknQa2yyFAH2WEo";

const authenticate = async (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const token = await response.data.idToken;
  return token;
};

export const createUser = async (email, password) => {
  return await authenticate("signUp", email, password);
};

export const loginUser = async (email, password) => {
  return await authenticate("signInWithPassword", email, password);
};
