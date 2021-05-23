import * as actionTypes from "./actionTypes";
import axios from "axios";

import dotenv from "dotenv";

dotenv.config();

const API_KEY =
  process.env.API_KEY || "AIzaSyAxd6Mgt4tl1ILpIUhVyUk1_wXYOGiVto0";

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (authData) => ({
  type: actionTypes.AUTH_SUCCESS,
  authData,
});

export const authFailed = (error) => ({
  type: actionTypes.AUTH_FAIL,
  error,
});

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => async (dispatch) => {
  dispatch(authStart());

  try {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };

    let url = isSignUp
      ? "https://identitytoolkit.googleapis.com/v1/accounts:signUp"
      : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword";

    const response = await axios.post(`${url}?key=${API_KEY}`, authData);

    const expirationTime = new Date(
      new Date().getTime() + response?.data?.expiresIn * 1000
    );

    localStorage.setItem("token", response.data.idToken);
    localStorage.setItem("expirationDate", expirationTime);
    localStorage.setItem("userId", response.data.localId);

    dispatch(authSuccess(response.data));
    dispatch(checkTimeout(response.data.expiresIn));
  } catch (err) {
    dispatch(authFailed(err.response.data.error));
  }
};

export const setAuthRedirect = (path) => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  path,
});

export const authCheckState = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  if (!token) {
    dispatch(logout());
  } else {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));

    if (expirationDate <= new Date()) {
      dispatch(logout());
    } else {
      const authData = {
        idToken: token,
        localId: localStorage.getItem("userId"),
      };

      dispatch(authSuccess(authData));
      dispatch(
        checkTimeout((expirationDate.getTime() - new Date().getTime()) / 1000)
      );
    }
  }

  return {
    type: actionTypes.AUTH_CHECK,
  };
};
