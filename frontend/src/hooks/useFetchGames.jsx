import { useEffect, useState } from 'react';

const useFetchGames = ({
    filters = '',
    isUnique = false,
    sort = false,
    unsort = false
    } = {}) => {

    // ⚙️ Strapi's URL :
    const API_URL = process.env.REACT_APP_API_URL;
    const GAMES_ROUTE = process.env.REACT_APP_GAMES_ROUTE;

    const query = `${GAMES_ROUTE}?populate=*${filters}`;

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);

        fetch(`${API_URL}${query}`, {
            method: 'GET',
            headers: {
              accept: 'application/json',
            },
          })
            .then(response => response.json())
            .then(res => {
                if(isUnique)
                    setData(res.data[0]) 
                else if(sort)
                    setData(res.data.sort((a, b) => a.attributes.title > b.attributes.title ? 1 : -1)) // Sort alphabetically (ascending order)
                else if(unsort)
                    setData(res.data.sort((a, b) => a.attributes.title < b.attributes.title ? 1 : -1)) // Sort alphabetically (descending order)
                else 
                    setData(res.data.sort((a, b) => 0.5 - Math.random())); // Shuffle
            })
            .catch(error => {
                setError(error);
                console.log('USE FETCH GAMES | ' + error);
            });

        setLoading(false);
    }

    useEffect( () => {
        fetchData();
    }, [query, API_URL, GAMES_ROUTE, isUnique])

    return { 
        data,
        setData,
        loading,
        error,
        fetchData
    }
}

export default useFetchGames;