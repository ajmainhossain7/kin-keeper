import React from 'react';

const Banner = () => {
    return (
        <div className='py-12 container mx-auto px-4 space-y-7'>
            <div className='text-center space-y-7'>
                <h1 className='font-bold text-4xl md:text-5xl text-[#1e4d3b]'>Friends to keep close in your life</h1>
                <p className='text-[#1e4d3ba4]'>Your personal shelf of meaningful connections. Browse, tend, and nurture the<br></br>
                    relationships that matter most.</p></div>
            <div className='items-center text-center'>
                <button className='bg-[#1e4d3b] text-white rounded-sm font-medium transition-colors border-0 cursor-pointer px-4 py-1.5'>+ Add a Friend
                </button>
            </div>
        </div>
    );
};

export default Banner;