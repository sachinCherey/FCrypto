import React, { useState, useEffect } from 'react';
import Coin from './Coin'; 

function Dashboard() {
    const [viewType, setViewType] = useState('grid');
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [clickedItemName, setClickedItemName] = useState(null);
    useEffect(() => {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en')
            .then((res) => res.json())
            .then((result) => setData(result));
    }, []);


    const handleItemClick = (itemName) => {
        setClickedItemName(itemName);
      };
    
      // Conditionally render HelloComponent when an item is clicked
      if (clickedItemName) {
        return <Coin coin={clickedItemName} />;
      }
    

    function myFun(data) {
        // Filter the data based on the search query
        const filteredData = data.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <div style={{ display: 'contents' }}>
                {filteredData.map((item) => (
                    <div  onClick={() => handleItemClick(item.id)} key={item.id} className={`card ${item.price_change_percentage_24h > 0 ? 'green-border' : 'red-border'}`}>
                        
                        <div className='logo'>
                            <div className='innercon'>
                                <img src={item.image} alt='pic' />
                            </div>
                            <div className='sInnerCon'>
                                <h1 style={{ fontSize: '2rem' }}>{item.symbol}</h1>
                                <p style={{ fontSize: '1.2rem' }}>{item.name}</p>
                            </div>
                        </div>
                        <div className='price'>
                            $ {item.current_price}
                            ({item.price_change_percentage_24h > 0 ? `+${item.price_change_percentage_24h}` : item.price_change_percentage_24h}%)
                        </div>
                        <div className='totalVolume'>
                            <strong>Total Volume: $ {item.total_volume}</strong>
                        </div>
                        <div className='marketCap'>
                            <strong>Market Cap: $ {item.market_cap}</strong>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    function listtItem(data) {
        // Filter the data based on the search query
        const filteredData = data.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.symbol.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return (
            <div className='list-container'>
                <div className='grid-container'>
                    {filteredData.map((item) => (
                        <div onClick={() => handleItemClick(item.id)}
                            key={item.id}
                            className={`grid-item list-item ${item.price_change_percentage_24h > 0 ? 'green-border' : 'red-border'}`}
                        >
                            <img className='coin-image' src={item.image} alt='pic' />
                            <div className='coin-details'>
                                <div className='coin-name inItem'>{item.name} ({item.symbol})</div>
                                <div className='coin-price inItem'>
                                    $ {item.current_price}
                                    <span className={item.price_change_percentage_24h > 0 ? 'green-text' : 'red-text inItem'}>
                                        ({item.price_change_percentage_24h > 0 ? `+${item.price_change_percentage_24h}` : item.price_change_percentage_24h}%)
                                    </span>
                                </div>
                                <div className='coin-volume inItem'>
                                    <strong>${item.total_volume}</strong>
                                </div>
                                <div className='coin-market-cap inItem'>
                                    <strong>${item.market_cap}</strong>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Event handler to update the search query state
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div id='grid'>
            <input
                id='search'
                type='text'
                placeholder="       Search"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <div style={{ width: '100%' }}>
                <button
                    onClick={() => setViewType('grid')}
                    className={`view-button ${viewType === 'grid' ? 'active' : ''}`}
                >
                    Grid
                </button>
                <button
                    onClick={() => setViewType('list')}
                    className={`view-button ${viewType === 'list' ? 'active' : ''}`}
                >
                    List
                </button>
            </div>
            <div id="gridItem" style={{ display: viewType === 'grid' ? 'grid' : 'none' }}>
                {myFun(data)}
            </div>
            <div id='listItem' style={{ display: viewType === 'list' ? 'block' : 'none' }}>
                {listtItem(data)}
            </div>
        </div>
    );
}

export default Dashboard;
