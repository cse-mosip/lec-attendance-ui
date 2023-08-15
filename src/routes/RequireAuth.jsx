import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Token from "../services/Token";
import jwtDecode from "jwt-decode";

function RequireAuth({ children, allowedRoles }) {
  const location = useLocation();

  try {
    var user = jwtDecode(Token.getAccessToken());
  } catch (error) {
    user = null;
  }

  return user ? (
    allowedRoles?.find((role) => user.user_type?.includes(role)) ? (
      children
    ) : (
      <Navigate to="unauthorized" state={{ from: location.pathname }} />
    )
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
}

export default RequireAuth;