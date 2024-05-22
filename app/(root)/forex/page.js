"use client";

import React, { useState, useEffect } from "react";

const fetchForexData = async () => {
  try {
    const response = await fetch(
      "https://backend-calendar.onlinekhabar.com/api/v1/forex"
    );
    const forexData = await response.json();
    return forexData.data[0].rates;
  } catch (error) {
    console.error("Error fetching forex data:", error);
    return [];
  }
};

const ForexCalculator = () => {
  const [rates, setRates] = useState([]);
  const [baseAmount, setBaseAmount] = useState(1);
  const [targetAmount, setTargetAmount] = useState(0);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("NPR");

  useEffect(() => {
    const getRates = async () => {
      const ratesData = await fetchForexData();

      const nepaleseCurrency = [
        {
          id: 0,
          currency_code: "NPR",
          currency_title: "Nepalese Rupee",
          thumbnail: "https://flagcdn.com/np.svg",
          unit: "1",
          buy: "1.0",
          sell: "1.0",
        },
      ];

      const combinedRates = [...ratesData, ...nepaleseCurrency];
      setRates(combinedRates);
      calculateTargetAmount(1, "USD", "NPR", combinedRates); // Initial calculation
    };
    getRates();
  }, []);

  const calculateTargetAmount = (amount, base, target, ratesData) => {
    const baseRate = ratesData.find((rate) => rate.currency_code === base);
    const targetRate = ratesData.find((rate) => rate.currency_code === target);
    if (baseRate && targetRate) {
      const totalBaseAmount =
        parseFloat(baseRate.buy) / parseFloat(baseRate.unit);
      const totalTargetAmount =
        parseFloat(targetRate.buy) / parseFloat(targetRate.unit);
      const convertedAmount = (amount * totalBaseAmount) / totalTargetAmount;
      setTargetAmount(convertedAmount.toFixed(2));
    }
  };

  const handleBaseAmountChange = (e) => {
    const amount = e.target.value;
    setBaseAmount(amount);
    calculateTargetAmount(amount, baseCurrency, targetCurrency, rates);
  };

  const handleTargetAmountChange = (e) => {
    const amount = e.target.value;
    setTargetAmount(amount);
    const baseRate = rates.find((rate) => rate.currency_code === baseCurrency);
    const targetRate = rates.find(
      (rate) => rate.currency_code === targetCurrency
    );
    if (baseRate && targetRate) {
      const convertedAmount =
        (amount * parseFloat(targetRate.buy)) / parseFloat(baseRate.buy);
      setBaseAmount(convertedAmount.toFixed(2));
    }
  };

  const handleBaseCurrencyChange = (e) => {
    setBaseCurrency(e.target.value);
    calculateTargetAmount(baseAmount, e.target.value, targetCurrency, rates);
  };

  const handleTargetCurrencyChange = (e) => {
    setTargetCurrency(e.target.value);
    calculateTargetAmount(baseAmount, baseCurrency, e.target.value, rates);
  };

  const getThumbnail = (currencyCode) => {
    const rate = rates.find((rate) => rate.currency_code === currencyCode);
    return rate ? rate.thumbnail : "";
  };

  return (
    <div
      className="forex-calculator"
      style={{
        maxWidth: "600px",
        marginTop: "200px",
        marginBottom: "250px",
        marginLeft: "500px",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h1>Forex Calculator</h1>
      <div className="forex-input-group" style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>Amount</label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="number"
            value={baseAmount}
            onChange={handleBaseAmountChange}
            style={{
              flex: "1",
              marginRight: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={getThumbnail(baseCurrency)}
              alt={baseCurrency}
              style={{ width: "20px", height: "14px", marginRight: "10px" }}
            />
            <select
              value={baseCurrency}
              onChange={handleBaseCurrencyChange}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              {rates
                .filter((rate) => rate.currency_code !== targetCurrency)
                .map((rate) => (
                  <option key={rate.id} value={rate.currency_code}>
                    {rate.currency_title}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
      <div className="forex-input-group" style={{ marginBottom: "20px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Converted to
        </label>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="number"
            value={targetAmount}
            onChange={handleTargetAmountChange}
            style={{
              flex: "1",
              marginRight: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={getThumbnail(targetCurrency)}
              alt={targetCurrency}
              style={{ width: "20px", height: "14px", marginRight: "10px" }}
            />
            <select
              value={targetCurrency}
              onChange={handleTargetCurrencyChange}
              style={{
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            >
              {rates
                .filter((rate) => rate.currency_code !== baseCurrency)
                .map((rate) => (
                  <option key={rate.id} value={rate.currency_code}>
                    {rate.currency_title}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForexCalculator;
