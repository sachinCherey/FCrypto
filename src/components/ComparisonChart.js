import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ComparisonChart = ({ coin1, coin2, duration }) => {
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    // Fetch data for coin1
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${coin1}/market_chart?vs_currency=usd&days=${duration}`)
      .then((response) => {
        const coin1Data = response.data.prices.map((priceData) => ({
          time: new Date(priceData[0]).toLocaleDateString(),
          [`${coin1} Price (USD)`]: priceData[1],
        }));

        // Fetch data for coin2
        axios
          .get(`https://api.coingecko.com/api/v3/coins/${coin2}/market_chart?vs_currency=usd&days=${duration}`)
          .then((response2) => {
            const coin2Data = response2.data.prices.map((priceData) => ({
              time: new Date(priceData[0]).toLocaleDateString(),
              [`${coin2} Price (USD)`]: priceData[1],
            }));

            // Combine the data for both coins
            const combined = coin1Data.map((entry, index) => ({
              ...entry,
              ...coin2Data[index],
            }));

            setCombinedData(combined);
          })
          .catch((error2) => {
            console.error(`Error fetching data for ${coin2}: ${error2}`);
          });
      })
      .catch((error) => {
        console.error(`Error fetching data for ${coin1}: ${error}`);
      });
  }, [coin1, coin2, duration]);

  return (
    <div>
      <h3>Comparison Chart for {coin1} and {coin2}</h3>
      <LineChart width={800} height={400} data={combinedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip labelFormatter={(label) => label} />
        <Legend />
        <Line type="monotone" dataKey={`${coin1} Price (USD)`} stroke="#8884d8" name={`${coin1} Price (USD)`} />
        <Line type="monotone" dataKey={`${coin2} Price (USD)`} stroke="#82ca9d" name={`${coin2} Price (USD)`} />
      </LineChart>
    </div>
  );
};

export default ComparisonChart;
