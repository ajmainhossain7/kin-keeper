import React from 'react';

import useFriends from '../../hooks/useFriends';
import { useNavigate } from 'react-router';

const statusConfig = {
    "on-track": { label: "On Track", bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
    "almost due": { label: "Almost Due", bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
    "overdue": { label: "Overdue", bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
};

const tagPalette = [
    "bg-[#e8f0ec] text-[#1e4d3b]",
    "bg-[#e6f1fb] text-[#185fa5]",
    "bg-[#faeeda] text-[#854f0b]",
    "bg-[#fbeaf0] text-[#993556]",
    "bg-[#eeedfe] text-[#534ab7]",
];

function tagColor(tag) {
    let h = 0;
    for (let i = 0; i < tag.length; i++) h = tag.charCodeAt(i) + ((h << 5) - h);
    return tagPalette[Math.abs(h) % tagPalette.length];
}

const Friends = () => {
    const { friends, loading, error } = useFriends();
    const navigate = useNavigate();

    if (loading) return <p className="text-center text-sm text-gray-400 py-10">Loading...</p>;
    if (error) return <p className="text-center text-sm text-red-400 py-10">{error}</p>;

    return (
        <div className="container mx-auto py-12 px-4">
            <hr className="border-[#80808035]" />

            <h2 className="text-lg font-bold text-[#0f2d22] mt-8 mb-5">Your Friends</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {friends.map((friend) => {
                    const st = statusConfig[friend.status] || statusConfig["on-track"];
                    return (
                        <div
                            key={friend.id}
                            onClick={() => navigate(`/friends/${friend.id}`)}
                            className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                        >
                            <img
                                src={friend.picture}
                                alt={friend.name}
                                className="w-16 h-16 rounded-full object-cover ring-2 ring-[#d4ede2]"
                            />
                            <div className="text-center">
                                <p className="text-sm font-semibold text-[#0f2d22]">{friend.name}</p>
                                <p className="text-xs text-gray-400">{friend.days_since_contact}d ago</p>
                            </div>
                            <div className="flex flex-wrap gap-1 justify-center">
                                {friend.tags.map((tag) => (
                                    <span key={tag} className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide ${tagColor(tag)}`}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${st.bg} ${st.text}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                                {st.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Friends;