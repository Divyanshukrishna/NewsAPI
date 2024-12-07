import React, { useEffect, useState } from 'react';
import Card from './Card';

const Newsapp = () => {
    const [search, setSearch] = useState('india');
    const [newsData, setNewsData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://newsapi.org/v2/everything?q=${search}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const jsonData = await response.json();
            const dt = jsonData.articles.slice(0, 33);
            setNewsData(dt);
        } catch (err) {
            console.error('Error fetching data:', err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, [search]);

    const handleInput = (e) => {
        setSearch(e.target.value);
    };

    const userInput = (event) => {
        setSearch(event.target.value);
    };

    return (
        <div>
            <nav>
                <div>
                    <h1>Trendy News</h1>
                </div>
                <ul style={{ display: 'flex', gap: '11px' }}>
                    <a style={{ fontWeight: 600, fontSize: '17px' }}>All News</a>
                    <a style={{ fontWeight: 600, fontSize: '17px' }}>Trending</a>
                </ul>
                <div className='searchBar'>
                    <input
                        type='text'
                        placeholder='Search News'
                        value={search}
                        onChange={handleInput}
                    />
                    <button onClick={getData}>Search</button>
                </div>
            </nav>
            <div>
                <p className='head'>Stay Updated with Trendy News</p>
            </div>
            <div className='categoryBtn'>
                <button onClick={userInput} value='sports'>Sports</button>
                <button onClick={userInput} value='politics'>Politics</button>
                <button onClick={userInput} value='entertainment'>Entertainment</button>
                <button onClick={userInput} value='health'>Health</button>
                <button onClick={userInput} value='fitness'>Fitness</button>
            </div>

            <div>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {newsData ? <Card data={newsData} /> : !loading && <p>No data available.</p>}
            </div>
        </div>
    );
};

export default Newsapp;
