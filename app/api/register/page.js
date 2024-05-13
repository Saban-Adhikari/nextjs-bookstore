"use client";
import React, { useState } from "react";
import { RegisterApi } from "./registerApi";
import { useRef } from "react";
import Link from "next/link";

const RegisterPage = () => {
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [responseApi, setResponseApi] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add a new state for loading

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Profile Image:", profileImageBase64);

    setIsLoading(true); // Set loading state to true
    setResponseApi(null); // Reset responseApi to null

    try {
      const response = await RegisterApi(
        name,
        email,
        password,
        profileImageBase64
      );

      setName("");
      setEmail("");
      setPassword("");
      setProfileImage(null);
      setProfileImageBase64(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      console.log(response);

      setResponseApi(response.Message);
      setError(null); // Reset error state
    } catch (error) {
      console.error("Error registering:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    // Convert the file to base64
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      setProfileImageBase64(fileReader.result);
    };
    fileReader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };

  return (
    <>
      <div className="flex items-center min-h-16 bg-gray-100">
        <Link
          className="flex items-center ml-10 max-h-10 text-white justify-center px-5 py-2 text-sm  duration-200 bg-blue-500 rounded-lg gap-x-2"
          href="/card"
        >
          <svg
            class="h-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          Go back
        </Link>
      </div>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="profileImage"
                className="block text-gray-700 font-semibold mb-2"
              >
                Profile Image
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  id="profileImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            {isLoading ? (
              <button
                type="submit"
                disabled
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300 flex justify-center items-center"
              >
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-8 h-8 text-gray-200 animate-spin  fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Register
              </button>
            )}
            <div className="flex justify-center">
              {responseApi && (
                <p
                  className={
                    responseApi.toLowerCase() === "success"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {responseApi}
                </p>
              )}
              {error && <p className="text-red-500">Error: {error}</p>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
