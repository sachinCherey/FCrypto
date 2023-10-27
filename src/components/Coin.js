import React, { useState, useEffect } from 'react';

function Coin({ coinId }) {
  const [coinData, setCoinData] = useState(null);

  useEffect(() => {
    // Fetch coin data using the CoinGecko API based on the provided coinId
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`)
      .then((res) => res.json())
      .then((result) => setCoinData(result));
  }, [coinId]);

  if (!coinData) {
    return <div>Loading...</div>;
  }

  const { name, symbol, image, market_data, current_price, description } = coinData;

  return (
    <div>
      <h2>{name} ({symbol})</h2>
      <img src={image.small} alt={name} />
      <p>Price: ${current_price}</p>
      <p>Market Volume: ${market_data.total_volume.usd}</p>
      <p>Description: {description.en}</p>
    </div>
  );
}

export default Coin;
