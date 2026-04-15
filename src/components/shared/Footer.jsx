import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='bg-[#164c38] py-12'>
            <div className='container mx-auto text-center space-y-5'>
                <h2 className='text-4xl md:text-6xl text-white font-bold'>KeenKeeper</h2>
                <p className='text-white/70'>Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.</p>
                <div className='text-white'>
                    <p>Social Links</p>
                    <div className="flex gap-3 mt-3 justify-center">
                        <a href="#" className="p-2.5 text-[#164c38] bg-white rounded-full hover:bg-[#ffffffab] text-sm"><FaFacebookF /></a>
                        <a href="#" className="p-2.5 text-[#164c38] bg-white rounded-full hover:bg-[#ffffffab]  text-sm"><FaTwitter /></a>
                        <a href="#" className="p-2.5 text-[#164c38] bg-white rounded-full hover:bg-[#ffffffab] text-sm"><FaLinkedinIn /></a>
                    </div>
                </div>
                <div className="border-t border-white/10 py-5 px-4">
                    <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-white/50">
                        <p>Copyright © {new Date().getFullYear()} KeenKeeper. All rights reserved.</p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition">Privacy Policy</a>
                            <a href="#" className="hover:text-white transition">Terms of Service</a>
                            <a href="#" className="hover:text-white transition">Cookies</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Footer;