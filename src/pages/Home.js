import React, { useEffect, useState } from 'react';
import axios from '../api';

const Home = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Replace '/api/endpoint' with your Vate backend endpoint
        axios.get('/api/endpoint')
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <h1>Home</h1>
            <p>{data ? JSON.stringify(data) : 'Loading...'}</p>
        </div>
    );
};

export default Home;