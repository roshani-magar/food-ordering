import React, { useState } from 'react';
import axios from 'axios';

const FoodSearch = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost/php-rest-api/api-linearsearch.php', {
                params: {
                    query: query
                }
            });
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching food items:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for food..."
            />
            <button onClick={handleSearch}>Search</button>

            <ul>
                {results.map((item) => (
                    <li key={item.id}>
                        {item.title} - {item.description} - ${item.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FoodSearch;
