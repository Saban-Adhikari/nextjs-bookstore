"use client";
import { useState } from "react";

const DropDown = ({ changeStatus }) => {
  const [dropDownPopOver, setdropDownPopOver] = useState(false);

  function handleClick() {
    setdropDownPopOver(!dropDownPopOver);
  }

  const handleStatus = (status) => {
    changeStatus(status);
  };
  return (
    <>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-white bg-blue-500 hover:bg-purple-500  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center sm:py-3.5 sm:px-5"
        type="button"
        onClick={handleClick}
      >
        Book Status
        <svg
          class="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdown"
        className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${
          dropDownPopOver ? "" : "hidden"
        }`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <a
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => handleStatus("1")}
            >
              Available
            </a>
          </li>
          <li>
            <a
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => handleStatus("2")}
            >
              Not available
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DropDown;
