import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const CryptoPriceChart = ({ endpoint }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Fetch data from the provided API endpoint
    axios
      .get(endpoint)
      .then((response) => {
        const data = response.data.prices.map((priceData) => ({
          time: new Date(priceData[0]),
          price: priceData[1],
        }));
        setChartData(data);
      })
      .catch((error) => {
        console.error("Error fetching data from the API: " + error);
      });
  }, [endpoint]);

  // Function to format the date in a custom way
  const formatXAxisDate = (date) => {
    const options = { month: "short", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  return (
    <div>
      <h2>Crypto Price Chart</h2>
      <LineChart
        width={800}
        height={400}
        data={chartData}
        margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
      >
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis
          dataKey="time"
          tickFormatter={formatXAxisDate}
          interval={100} // Increase the X-axis tick interval
          tick={{ angle: -45, textAnchor: "end", fontSize: 12 }}
        />
        <YAxis />
        <Tooltip
          labelFormatter={(label) =>
            new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            }).format(label)
          }
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#8884d8"
          name="Price (USD)"
        />
      </LineChart>
    </div>
  );
};

export default CryptoPriceChart;
