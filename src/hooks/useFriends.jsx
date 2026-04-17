import { useEffect, useState } from 'react';

const useFriends = () => {
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                setTimeout(async () => {
                    const res = await fetch("/friends.json");
                    const data = await res.json();

                    setFriends(data);
                    setLoading(false);
                }, 1500); 
            } catch (err) {
                setError("Failed to load friends");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { friends, loading, error };
};

export default useFriends;