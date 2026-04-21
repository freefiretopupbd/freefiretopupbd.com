"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import axios from 'axios';

export default function Header() {
    const [query, setQuery] = useState('');
    const [user, setUser] = useState<any>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsMobile(window.innerWidth <= 767);
        const storedUser = localStorage.getItem('user-info');
        if (storedUser) setUser(JSON.parse(storedUser));

        const handleResize = () => setIsMobile(window.innerWidth <= 767);
        const handleScroll = () => setIsScrolled(window.scrollY > 50);

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    async function search(event: React.FormEvent) {
        event.preventDefault();
        try {
            await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/search/${query}`);
            // Assuming searchData state is passed to Search page via context or state management,
            // but in Next.js it's better to pass it via URL query or fetch on the page itself.
            // For now, we'll navigate to /search?q=query
            router.push(`/search?q=${query}`);
        } catch (error) {
            console.error('Error during search:', error);
            router.push(`/search?q=${query}`);
        }
    }

    const handleSidebarToggle = () => setIsSidebarVisible(!isSidebarVisible);

    return (
        <><div
  className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
  ${
    isScrolled
      ? "bg-[#0b1224]/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)]"
      : "bg-[#0b1224]/40 backdrop-blur-xl border-b border-white/5"
  }`}
>
  <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">

    <nav className="flex items-center justify-between gap-4">

      {/* LOGO */}
      <Link href="/" className="flex items-center">
        <img
          src="/src_assets/img/freefiretopupbd.png"
          alt="Logo"
          className="w-20 md:w-20 h-15 object-contain hover:scale-105 transition"
        />
      </Link>

      {/* SEARCH */}
      <form
        onSubmit={search}
        className={`flex-1 max-w-xl relative hidden md:block`}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, topup, offers..."
          className="w-full px-4 py-2.5 pl-10 rounded-xl
          bg-[#0f172a]/60 text-white placeholder:text-gray-400
          border border-white/10
          focus:outline-none focus:ring-2 focus:ring-pink-500/40
          focus:border-pink-500 transition"
          required
        />

        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </form>

      {/* MENU */}
      <div className="flex items-center gap-3 md:gap-6">

        <div className="hidden md:flex items-center gap-5 text-sm">
          <Link href="/topup" className="text-gray-300 hover:text-white transition">
            Topup
          </Link>
          <Link href="/faq" className="text-gray-300 hover:text-white transition">
            FAQ
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-white transition">
            Contact
          </Link>
        </div>

        {/* AUTH */}
        {!user ? (
          <div className="flex items-center gap-2">

            <Link
              href="/login"
              className="px-4 py-2 rounded-xl border border-pink-500 text-pink-400 hover:bg-pink-500/10 transition text-sm"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg hover:scale-105 transition text-sm"
            >
              Register
            </Link>

          </div>
        ) : (
          <button
  onClick={handleSidebarToggle}
  className="flex items-center gap-3 px-3 py-1.5 rounded-full
  bg-white/5 border border-white/10 hover:border-pink-500/30
  hover:bg-white/10 transition"
>

  {/* BALANCE (LEFT SIDE) */}
  <div className="px-2 py-1 rounded-full bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border border-yellow-400/30">
    <span className="text-xs text-yellow-300 font-medium">
      ৳ {user?.balance ?? 0}
    </span>
  </div>

  {/* AVATAR */}
  <div className="relative">
    <img
      src={
        user?.photoURL
          ? user.photoURL
          : "/src_assets/img/default.png"
      }
      className="w-9 h-9 rounded-full border border-white/10 object-cover"
      alt="profile"
    />

    {/* online dot */}
    <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border border-[#0b1224] rounded-full"></span>
  </div>

</button>
        )}

      </div>
    </nav>

  </div>
</div>
            {isSidebarVisible && <Sidebar onClose={() => setIsSidebarVisible(false)} />}
        </>
    );
}
