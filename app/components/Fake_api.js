"use client";

import { useEffect, useState } from "react";

export const FetchedData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://backend-calendar.onlinekhabar.com/api/v1/bullions`
      );
      const resp = await response.json();
      setData(resp.data);
    };

    fetchData();
  }, []);

  const filteredData = data.slice(0, 14);
  console.log("onlinekhabar,", filteredData);
  return filteredData;
};

export const lineChartData = {
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  datasets: [
    {
      label: "Gold prices",
      data: [3000, 5000, 4000, 6000, 8000, 10000, 9000],
      borderColor: "rgb(75, 192, 192)",
    },
  ],
};
