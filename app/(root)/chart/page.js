"use client";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Select from "react-select";
import "chart.js/auto"; // Required for Chart.js 3.x+

const fetchForexData = async () => {
  try {
    const response = await fetch(
      "https://backend-calendar.onlinekhabar.com/api/v1/forex"
    );
    const forexData = await response.json();
    return forexData.data;
  } catch (error) {
    console.error("Error fetching forex data:", error);
    return [];
  }
};

const ForexGraph = () => {
  const [rates, setRates] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    const getRates = async () => {
      const ratesData = await fetchForexData();

      // Extract historical data for NPR and other currencies
      const historicalRates = ratesData
        .map((entry) => {
          const date = entry.date;
          const rates = entry.rates.reduce((acc, rate) => {
            if (rate.currency_code !== "NPR") {
              acc.push({
                date,
                currency: rate.currency_title,
                rate: parseFloat(rate.buy),
              });
            }
            return acc;
          }, []);
          return rates;
        })
        .flat();

      setRates(historicalRates);
    };

    getRates();
  }, []);

  useEffect(() => {
    // Filter historical data for the selected currency
    if (selectedCurrency) {
      const filteredData = rates.filter(
        (rate) => rate.currency === selectedCurrency.value
      );
      setHistoricalData(filteredData);
    }
  }, [selectedCurrency, rates]);

  const handleCurrencyChange = (selectedOption) => {
    setSelectedCurrency(selectedOption);
  };

  const options = [
    ...new Set(
      rates.map((rate) => ({ value: rate.currency, label: rate.currency }))
    ),
  ];

  const data = {
    labels: historicalData.map((dataPoint) => dataPoint.date),
    datasets: [
      {
        label: `${selectedCurrency ? selectedCurrency.value : "NPR"} to NPR`,
        data: historicalData.map((dataPoint) => dataPoint.rate),
        fill: false,
        borderColor: "blue",
      },
    ],
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Select
          value={selectedCurrency}
          onChange={handleCurrencyChange}
          options={options}
          placeholder="Select Currency"
          styles={{ container: (base) => ({ ...base, width: "100%" }) }}
        />
      </div>
      <Line data={data} />
    </div>
  );
};

export default ForexGraph;
