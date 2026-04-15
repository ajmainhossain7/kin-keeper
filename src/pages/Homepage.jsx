import React from 'react';
import Banner from '../components/homepage/Banner';
import BStats from '../components/homepage/BStats';
import Friends from '../components/homepage/Friends';

const Homepage = () => {
    return (
        <div>
            <Banner></Banner>
            <BStats></BStats>
            <Friends></Friends>
            
        </div>
    );
};

export default Homepage;