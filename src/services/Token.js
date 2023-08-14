import jwtDecode from "jwt-decode";

const setAccessToken = (value) => {
  sessionStorage.setItem("AccessToken", value);
};

const getAccessToken = (value) => {
  return sessionStorage.getItem("AccessToken");
};

const removeAccessToken = () => {
  sessionStorage.removeItem("AccessToken");
};

const getAuth = () => {
  const jwt = sessionStorage.getItem("AccessToken");

  try {
    const user = jwtDecode(jwt);
    // console.log("user :", user);
    return user;
  } catch (err) {
    return null;
  }
};

export default {
  setAccessToken,
  getAccessToken,
  removeAccessToken,
  getAuth,
};