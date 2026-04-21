"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { FaWhatsapp, FaFacebook, FaInstagram, FaYoutube, FaEnvelope, FaHome, FaWallet, FaList, FaUser, FaTicketAlt, FaBolt } from 'react-icons/fa';

export default function Footer() {
    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user-info') || 'null') : null;
    const siteSettings = useSiteSettings();
    const [isSupportOpen, setIsSupportOpen] = useState(false);

    if (!siteSettings?.contact_info) {
        return <div className="p-4 text-center text-gray-500">Loading footer...</div>;
    }

    const { contact_info } = siteSettings;

    return (
        <>
            <footer className="mt-auto mb-16 md:mb-0 text-slate-200 border-t border-slate-800 bg-slate-950">

  <section className="container mx-auto px-5 py-12">

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

      {/* 1. Stay Connected */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Stay Connected
        </h3>

        <p className="text-slate-400 text-sm mb-5 leading-relaxed">
          কোনো সমস্যায় পড়লে হোয়াটসঅ্যাপ এ যোগাযোগ করুন।
        </p>

        <div className="flex gap-3">

          <a href={contact_info.facebook} target="_blank"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 hover:text-blue-400 transition">
            <FaFacebook />
          </a>

          <a href={contact_info.instagram} target="_blank"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500 hover:text-pink-400 transition">
            <FaInstagram />
          </a>

          <a href={contact_info.youtube} target="_blank"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 border border-slate-800 hover:border-red-500 hover:text-red-400 transition">
            <FaYoutube />
          </a>

        </div>
      </div>

      {/* 2. Quick Links */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Quick Links
        </h3>

        <div className="flex flex-col gap-2 text-slate-400 text-sm">

          <Link href="/about" className="hover:text-white transition">
            About Us
          </Link>

          <Link href="/privacy-policy" className="hover:text-white transition">
            Privacy Policy
          </Link>

          <Link href="/refund-policy" className="hover:text-white transition">
            Refund Policy
          </Link>

        </div>
      </div>

      {/* 3. Support */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Support
        </h3>

        <a
          href={`https://wa.me/${contact_info.whatsapp_number}`}
          target="_blank"
          className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-green-500/40 hover:shadow-lg transition"
        >

          <FaWhatsapp size={26} className="text-green-400" />

          <div>
            <p className="text-xs text-slate-400">Help line</p>
            <p className="font-semibold text-white">
              {contact_info.phone_number}
            </p>
          </div>

        </a>
      </div>

    </div>

  </section>

  {/* COPYRIGHT */}
  <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
    <p>© Copyright 2026. All Rights Reserved.</p>
  </div>

  {/* FLOATING SUPPORT */}
  <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex items-center gap-2">

    {isSupportOpen && (
      <a
        href={`https://wa.me/${contact_info.whatsapp_number}`}
        target="_blank"
        className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition"
      >
        <FaWhatsapp size={22} />
      </a>
    )}

    <button
      onClick={() => setIsSupportOpen(!isSupportOpen)}
      className="px-4 py-3 rounded-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium shadow-lg hover:scale-105 transition"
    >
      {isSupportOpen ? "Close" : "Support!"}
    </button>

  </div>

  {/* MOBILE NAV */}
  <nav className="fixed md:hidden bottom-0 left-0 w-full bg-slate-950 border-t border-slate-800 z-40 text-slate-400 flex justify-between pb-2 pt-2">

    <Link href="/" className="flex flex-col items-center p-2 hover:text-white transition w-full">
      <FaHome size={20} className="mb-1" />
      <span className="text-[10px] font-medium">Home</span>
    </Link>

    {!user ? (
      <>
        <a href={contact_info.youtube} target="_blank"
          className="flex flex-col items-center p-2 hover:text-white transition w-full">
          <FaYoutube size={20} className="mb-1" />
          <span className="text-[10px] font-medium">Tutorial</span>
        </a>

        <Link href="/topup" className="flex flex-col items-center p-2 hover:text-white transition w-full">
          <FaBolt size={20} className="mb-1" />
          <span className="text-[10px] font-medium">TopUp</span>
        </Link>

        <Link href="/contact" className="flex flex-col items-center p-2 hover:text-white transition w-full">
          <FaEnvelope size={20} className="mb-1" />
          <span className="text-[10px] font-medium">Contact</span>
        </Link>
      </>
    ) : (
      <>
        <Link href="/profile/add-money" className="flex flex-col items-center p-2 hover:text-white transition w-full">
          <FaWallet size={20} className="mb-1" />
          <span className="text-[10px] font-medium">Wallet</span>
        </Link>

        <Link href="/profile/order" className="flex flex-col items-center p-2 hover:text-white transition w-full">
          <FaList size={20} className="mb-1" />
          <span className="text-[10px] font-medium">Orders</span>
        </Link>

        <Link href="/profile/my-codes" className="flex flex-col items-center p-2 hover:text-white transition w-full">
          <FaTicketAlt size={20} className="mb-1" />
          <span className="text-[10px] font-medium">Codes</span>
        </Link>

        <Link href="/profile" className="flex flex-col items-center p-2 hover:text-white transition w-full">
          <FaUser size={20} className="mb-1" />
          <span className="text-[10px] font-medium">Account</span>
        </Link>
      </>
    )}

  </nav>

</footer>
        </>
    );
}
