import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={loginWithRedirect}
        className="bg-blue-500 text-white p-4 rounded"
      >
        Iniciar Sesión
      </button>
    </div>
  );
};

export default Login;
