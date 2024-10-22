import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (personalEmail, password, rememberMe) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/people/loginPerson`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ personalEmail, password }),
        credentials: "include",
      }
    );
    const json = await response.json();

    if (!response.ok) {
      const errorData = await response.json();
      setIsLoading(false);
      setError(errorData.error || "Login failed. Please try again.");
      return;
    }

    if (rememberMe) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }

    if (response.ok) {
      // save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });

      setTimeout(() => {
        navigate("/admin/default");
      }, 1000);

      // update loading state
      setIsLoading(false);
    }
  };

  const persistLogin = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch({ type: "LOGIN", payload: JSON.parse(storedUser) });
      navigate("/admin/default");
    }
  };

  return { login, persistLogin, isLoading, error };
};
