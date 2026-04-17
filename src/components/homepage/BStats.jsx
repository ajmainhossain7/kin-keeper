import React from 'react';
import useFriends from '../../hooks/useFriends';

const BStats = () => {
    const { friends } = useFriends();

    const total = friends.length;
    const onTrack = friends.filter((f) => f.status === "on-track").length;
    const needAttention = friends.filter((f) => f.status !== "on-track").length;
    const interactions = friends.filter((f) => f.days_since_contact <= 30).length;

    const stats = [
        { value: total, label: "Total Friends" },
        { value: onTrack, label: "On Track" },
        { value: needAttention, label: "Need Attention" },
        { value: interactions, label: "Interactions This Month" },
    ];

    return (
        <div className='container mx-auto px-4'>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 text-center'>
                {stats.map(({ value, label }) => (
                    <div key={label} className='bg-white p-10 rounded-lg border border-gray-100'>
                        <p className='text-3xl font-bold text-[#0f2d22]'>{value}</p>
                        <p className='text-sm text-gray-400 mt-1'>{label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BStats;