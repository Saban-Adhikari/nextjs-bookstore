"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const ForexCalculator = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("NPR");
  const [amountBase, setAmountBase] = useState(1);
  const [amountTarget, setAmountTarget] = useState(0);
  const [conversionRates, setConversionRates] = useState({});

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/c6959b437a74f12a7446f5c0/latest/${baseCurrency}`
        );
        setConversionRates(response.data.conversion_rates);
        setAmountTarget(
          (1 * response.data.conversion_rates[targetCurrency]).toFixed(2)
        );
      } catch (error) {
        console.error("Error fetching conversion rates:", error);
      }
    };
    fetchRates();
  }, [baseCurrency, targetCurrency]);

  const handleBaseAmountChange = (e) => {
    const value = e.target.value;
    setAmountBase(value);
    if (conversionRates[targetCurrency]) {
      setAmountTarget((value * conversionRates[targetCurrency]).toFixed(2));
    }
  };

  const handleTargetAmountChange = (e) => {
    const value = e.target.value;
    setAmountTarget(value);
    if (conversionRates[targetCurrency]) {
      setAmountBase((value / conversionRates[targetCurrency]).toFixed(2));
    }
  };

  const handleBaseCurrencyChange = (e) => {
    setBaseCurrency(e.target.value);
  };

  const handleTargetCurrencyChange = (e) => {
    setTargetCurrency(e.target.value);
  };

  return (
    <div className="flex justify-center p-4 m-14 w-full">
      <div className="container bg-white p-6 m-16 rounded-lg shadow-lg max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Forex Calculator
        </h1>
        <div className="flex mb-6">
          <div className="w-1/2 pr-2">
            <label className="block mb-2 font-medium text-gray-700">
              Amount:
            </label>
            <input
              type="number"
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
              value={amountBase}
              onChange={handleBaseAmountChange}
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block mb-2 font-medium text-gray-700">
              Base Currency:
            </label>
            <select
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
              value={baseCurrency}
              onChange={handleBaseCurrencyChange}
            >
              {Object.keys(conversionRates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex mb-6">
          <div className="w-1/2 pr-2">
            <label className="block mb-2 font-medium text-gray-700">
              Amount:
            </label>
            <input
              type="number"
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
              value={amountTarget}
              onChange={handleTargetAmountChange}
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block mb-2 font-medium text-gray-700">
              Target Currency:
            </label>
            <select
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-blue-500"
              value={targetCurrency}
              onChange={handleTargetCurrencyChange}
            >
              {Object.keys(conversionRates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="bg-blue-100 p-4 mt-6 rounded text-center">
          <h2 className="text-2xl font-bold text-blue-600">Exchange Rate:</h2>
          <p className="text-xl">
            1 {baseCurrency} = {conversionRates[targetCurrency]?.toFixed(2)}{" "}
            {targetCurrency}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForexCalculator;
