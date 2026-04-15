import React, { useState } from 'react';

import { AiOutlineHome, AiOutlineClockCircle, AiOutlineBarChart } from 'react-icons/ai';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { NavLink } from 'react-router';

const navLinks = [
    { label: 'Home', to: '/', icon: <AiOutlineHome size={16} /> },
    { label: 'Timeline', to: '/timeline', icon: <AiOutlineClockCircle size={16} /> },
    { label: 'Stats', to: '/stats', icon: <AiOutlineBarChart size={16} /> },
];

const linkClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-4 py-1.5 rounded-sm text-sm font-medium transition-colors border-0 cursor-pointer no-underline
    ${isActive
        ? 'bg-[#1e4d3b] text-white'
        : 'bg-transparent text-[#444] hover:bg-[#f0f9f4] hover:text-[#1e4d3b]'
    }`;

const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-colors border-0 cursor-pointer w-full text-left no-underline
    ${isActive
        ? 'bg-[#1e4d3b] text-white'
        : 'bg-transparent text-[#444] hover:bg-[#f0f9f4] hover:text-[#1e4d3b]'
    }`;

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="w-full bg-white border-b border-gray-200 px-4 md:px-8">
            <div className="container mx-auto flex items-center justify-between h-14">

                {/* Logo */}
                <h2 className="text-[#1e4d3b] font-bold text-2xl tracking-tight select-none m-0">
                    Keen<span className="font-semibold">Keeper</span>
                </h2>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map(({ label, to, icon }) => (
                        <NavLink key={label} to={to} className={linkClass} end>
                            {icon}
                            {label}
                        </NavLink>
                    ))}
                </div>

                {/* Mobile hamburger */}
                <button
                    className="md:hidden text-[#1e4d3b] p-1 rounded focus:outline-none border-0 bg-transparent cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
                </button>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
                <div className="md:hidden border-t border-gray-100 py-2 flex flex-col gap-1">
                    {navLinks.map(({ label, to, icon }) => (
                        <NavLink
                            key={label}
                            to={to}
                            className={mobileLinkClass}
                            onClick={() => setMenuOpen(false)}
                            end
                        >
                            {icon}
                            {label}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
};

export default Navbar;