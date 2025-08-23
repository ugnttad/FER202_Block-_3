import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    const redirect = `/login?redirect_uri=${encodeURIComponent(
      location.pathname + location.search
    )}`;
    return <Navigate to={redirect} replace />;
  }
  return children;
}
