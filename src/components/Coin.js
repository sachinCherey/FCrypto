import React, { useEffect, useState } from 'react';

function Coin({ coin }) {
  const [coinData, setCoinData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`https://api.coingecko.com/api/v3/coins/${coin}`)
      .then((res) => res.json())
      .then((result) => {
        setCoinData(result);
        setDescription(result.description.en.replace(/<\/?[^>]+(>|$)/g, ''));
        setImage(result.image.large);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [coin]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!coinData) {
    return null;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{coinData.name}</h2>
      <img src={image} alt={coinData.name} style={styles.image} />
      <p style={styles.description}>{description}</p>
      <p style={styles.info}>Current Price: ${coinData.market_data.current_price.usd}</p>
      <p style={styles.info}>Market Cap: ${coinData.market_data.market_cap.usd}</p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '10px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  image: {
    width: '200px',
    marginBottom: '20px',
    borderRadius: '10px',
  },
  description: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  info: {
    marginBottom: '10px',
  },
};

export default Coin;