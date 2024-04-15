import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { LoginScreen } from "./screens/LogInScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state: any) => state.auth);

  const signedOutRoutes = () => {
    return (
      <Routes>
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<RegisterScreen />} />
      </Routes>
    );
  };

  const signedInRoutes = () => {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="*" element={<WelcomeScreen />} />
      </Routes>
    );
  };

  return <>{user?.email ? signedInRoutes() : signedOutRoutes()}</>;
}

export default App;
