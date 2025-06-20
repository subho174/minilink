import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import axios from "axios";
import NotFound from "./pages/NotFound";

const App = () => {
  const api = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_URL,
      withCredentials: true,
    });

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sign-in" element={<SignInPage api={api} />} />
      <Route path="/sign-up" element={<SignUpPage api={api} />} />
      <Route path="/dashboard" element={<Dashboard api={api} />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
