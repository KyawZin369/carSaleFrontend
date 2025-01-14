import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { BaseApi } from "../api/BaseApi";

type UserData = {
  name: string;
  email: string;
  password: string;
  is_admin: boolean;
};

async function userRegister(userData: UserData): Promise<any> {
  const response = await fetch(`${BaseApi}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to register user");
  }

  return response.json();
}

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [is_admin, setIs_admin] = useState(false);

  const navigate = useNavigate();

  const createUser = useMutation<any, Error, UserData>({
    mutationFn: userRegister,
    onSuccess: (data) => {
      alert("Registration successful!");
      navigate("/login");
    },
    onError: (error) => {
      console.error("Error registering user:", error.message);
      alert("Registration failed. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createUser.mutate({
      name,
      email,
      password,
      is_admin,
    });
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const validateForm = () => {
    return name && email && password && validatePassword(password);
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(/banner.jpg)" }}
    >
      {/* Overlay with opacity */}
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-600 to-blue-500">
        <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Register
          </h2>
          <form
            onSubmit={(e) => {
              validateForm()
                ? handleSubmit(e)
                : alert(
                    "Please fill all the fields and password should contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
                  );
            }}
          >
            <div className="mb-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Full Name"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Email"
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                checked={is_admin}
                onChange={(e) => setIs_admin(e.target.checked)}
                className="mr-2"
              />
              <label className="text-gray-600">Register In Admin Role</label>
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
            >
              Register
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?
              <a href="/login" className="text-blue-500 hover:underline">
                {" "}
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
