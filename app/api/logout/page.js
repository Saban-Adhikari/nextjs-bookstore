import React from "react";
import { signOut } from "next-auth/react";

const LogoutPage = () => {
  // const handleLogout = () => {
  //   signOut({ callbackUrl: '/' }); // Replace '/' with the desired redirect URL after logout
  // };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Log out of your account
            </h1>
            <div>
              <p className="text-gray-500 dark:text-gray-300 mb-4">
                Are you sure you want to log out?
              </p>
              <div className="flex items-center justify-between">
                <button
                  // onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoutPage;
