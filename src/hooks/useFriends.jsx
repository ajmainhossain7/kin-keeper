import React, { useEffect, useState } from 'react';

const useFriends = () => {
    const [friends, setFriends] = useState([]);
        // const [showAll, setShowAll] = useState(false); // ✅ new state
    
        useEffect(() => {
            const fetchData = async () => {
                const res = await fetch("/friends.json");
                const data = await res.json();
                setFriends(data);
            };
            fetchData();
        }, []);
    return (
        {friends}
    );
};

export default useFriends;