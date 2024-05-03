"use client";
import { useEffect, useState } from "react";
import DropDown from "./dropDown";

const Categories = ({ onGenreChange, onStatusChange }) => {
  const [genreList, setGenreList] = useState([]);
  const [activeButtons, setActiveButtons] = useState([]);

  const fetchGenreData = async () => {
    try {
      const response = await fetch("https://htdrnl.cyclic.app/api/genre", {
        method: "POST",
        body: JSON.stringify({
          FLAG: "S",
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setGenreList(data);
    } catch (error) {
      console.log("error getting data: ", error);
    }
  };

  useEffect(() => {
    fetchGenreData();
  }, []);

  const handleGenreClick = (genre) => {
    onGenreChange(genre);
  };

  const handleSatusClick = (status) => {
    onStatusChange(status);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="ml-7">
        <div className="categories">
          <ul className="flex flex-wrap gap-2 sm:gap-5">
            <li>
              {genreList && genreList.Values && genreList.Values.length > 0 ? (
                <DropDown changeStatus={handleSatusClick} />
              ) : (
                ""
              )}
            </li>
            <li>
              {genreList && genreList.Values && genreList.Values.length > 0 ? (
                <button
                  className={`bg-blue-500 hover:bg-purple-500 gap-5 rounded-md text-white py-2 px-3 sm:py-3 sm:px-4 ${
                    activeButtons.includes("-1") ? "bg-green-500" : ""
                  }`}
                  onClick={() => {
                    handleGenreClick("-1");
                    setActiveButtons(
                      activeButtons.includes("-1")
                        ? activeButtons.filter((item) => item !== "-1")
                        : ["-1"]
                    );
                  }}
                >
                  All
                </button>
              ) : (
                ""
              )}
            </li>
            {genreList &&
              genreList.Values &&
              genreList.Values.length > 0 &&
              genreList.Values.map((item, index) => (
                <li key={index}>
                  <button
                    className={`bg-blue-500 hover:bg-purple-500 gap-5 rounded-lg text-white py-2 px-3 sm:py-3 sm:px-2 ${
                      activeButtons.includes(item.title) ? "bg-green-500" : ""
                    }`}
                    onClick={() => {
                      handleGenreClick(`${item.title}`);
                      setActiveButtons([item.title]);
                    }}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Categories;
