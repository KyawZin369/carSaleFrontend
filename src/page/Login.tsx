import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { BaseApi } from "../api/BaseApi";
import { useNavigate } from "react-router";

// Define the input type for login data
interface LoginData {
  email: string;
  password: string;
}

// Define the response type from the server
interface LoginResponse {
  token: string; // Example: Authentication token
  user: {
    id: string;
    name: string;
    email: string;
  };
  is_admin: boolean;
}

// API function to handle login
const loginUser = async (loginData: LoginData): Promise<LoginResponse> => {
  const response = await fetch(`${BaseApi}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return response.json();
};


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const loginMutation = useMutation<LoginResponse, Error, LoginData>({
    mutationFn: loginUser,
    onSuccess: (data) => {
      alert("Login successful!");
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", data.user.id);
      if(data.is_admin) {
        navigate("/admin");
      }else {
        navigate("/car-list");
      }
    },
    onError: (error) => {
      console.error("Error logging in:", error.message);
      alert(error.message || "Login failed. Please try again.");
    },
  });

  // const validatePassword = (password: string): boolean => {
  //   const regex = /^[A-Za-z]{8}$/;
  //   return regex.test(password);
  // };

  // const validateForm = (): boolean => {
  //   return email.length > 0 && password.length > 0 && validatePassword(password);
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center">
      {/* Overlay with opacity */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-600 to-blue-500">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
              disabled={loginMutation.status === 'pending'}
            >
              {loginMutation.status === 'pending' ? "Logging in..." : "Login"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Don't have an account?
              <a href="/register" className="text-blue-500 hover:underline">
                {" "}
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
