import { useState, useEffect } from 'react';
import axios from 'axios';

const CharacterSearch = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        // Fetch food items from PHP API
        axios.get('http://localhost/php-rest-api/api-charactersearch.php')
            .then(response => {
                setFoodItems(response.data);
                setFilteredItems(response.data); // Initialize filtered items
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        // Filter items based on the search query
        const filtered = foodItems.filter(item =>
            item.title.toLowerCase().includes(query)
        );
        setFilteredItems(filtered);
    };

    return (
        <div>
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search food items..."
            />
            <ul>
                {filteredItems.map(item => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterSearch;
