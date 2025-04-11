import { useState } from "react";
import axios from "axios";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = axios.create({
    baseURL: "http://localhost:5000/user",
    headers: { "Content-Type": "application/json" },
  });

  const signup = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post("/signup", formData);
      return response.data.success;
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.post("/login", credentials);
      return response.data.success;
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { signup, login, loading, error };
};

export default useAuth;
