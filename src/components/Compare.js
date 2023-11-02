import React, { useEffect, useState } from 'react';
import Coin from './Coin';
import ComparisonChart from './ComparisonChart';
import axios from 'axios';
import Select from 'react-select';

function Compare() {
  const [coin1, setCoin1] = useState('');
  const [coin2, setCoin2] = useState('');
  const [duration, setDuration] = useState('7');
  const [coin1Data] = useState([]);
  const [coin2Data] = useState([]);
  const [coinList, setCoinList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  console.log(searchTerm);
  useEffect(() => {
    // Fetch coin list
    axios
      .get('https://api.coingecko.com/api/v3/coins/list')
      .then((response) => {
        const formattedCoinList = response.data.map((coin) => ({
          value: coin.id,
          label: coin.name,
        }));
        setCoinList(formattedCoinList);
      })
      .catch((error) => {
        console.error('Error fetching coin list:', error);
      });
  }, []);

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  return (
    <div>
      <h2>Select Coins for Comparison:</h2>
      <div>
        <label>Coin 1:</label>
        <Select
          options={coinList}
          value={coin1 ? { value: coin1, label: coin1 } : null}
          onChange={(selectedOption) => setCoin1(selectedOption ? selectedOption.value : '')}
          onInputChange={(inputValue) => setSearchTerm(inputValue)}
          isSearchable
        />
      </div>
      <div>
        <label>Coin 2:</label>
        <Select
          options={coinList}
          value={coin2 ? { value: coin2, label: coin2 } : null}
          onChange={(selectedOption) => setCoin2(selectedOption ? selectedOption.value : '')}
          onInputChange={(inputValue) => setSearchTerm(inputValue)}
          isSearchable
        />
      </div>
      <div>
        <label>Comparison Duration:</label>
        <select value={duration} onChange={handleDurationChange}>
          <option value="7">7 Days</option>
          <option value="30">30 Days</option>
          <option value="90">90 Days</option>
        </select>
      </div>
      {coin1 && (
        <div>
          <h2>Coin 1 Details:</h2>
          <Coin coin={coin1} duration={duration} />
        </div>
      )}
      {coin2 && (
        <div>
          <h2>Coin 2 Details:</h2>
          <Coin coin={coin2} duration={duration} />
        </div>
      )}
      {coin1Data.length > 0 && coin2Data.length > 0 && (
        <div>
          <h2>Comparison Chart:</h2>
          <ComparisonChart coin1Data={coin1Data} coin2Data={coin2Data} />
        </div>
      )}
    </div>
  );
}

export default Compare;
