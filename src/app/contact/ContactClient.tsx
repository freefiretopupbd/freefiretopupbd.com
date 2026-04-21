"use client";

import React from "react";
import { useSiteSettings } from "@/context/SiteSettingsContext";
import {
  FaPhoneAlt,
  FaFacebookMessenger,
  FaWhatsapp,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";

export default function ContactClient() {
  const siteSettings = useSiteSettings();

  if (!siteSettings) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-400">
        Loading...
      </div>
    );
  }

  const { contact_info } = siteSettings;

  return (
    <div className="container mx-auto px-2 md:px-4 py-6 md:py-10 max-w-6xl bg-gradient-to-b from-[#070c18] via-[#0b1224] to-[#05070d] text-white">

      {/* HEADER */}
      <div className="text-center mb-12">

        <h1 className="text-3xl md:text-5xl font-bold">
          Contact Us
        </h1>

        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mt-3">
          Free Fire diamond top-up support — 24/7 active support system
        </p>

        {/* STATUS BADGE */}
        <div className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-400">
          <FaClock className="text-orange-400" />
          <span>Average response time: 1–5 minutes</span>
        </div>

      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* PHONE */}
        {contact_info?.phone_number && (
          <a
            href={`tel:${contact_info.phone_number}`}
            className="group flex items-center gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-md hover:shadow-xl hover:border-slate-700 transition"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition">
              <FaPhoneAlt />
            </div>

            <div>
              <h3 className="text-base font-semibold text-white">
                Direct Call
              </h3>
              <p className="text-sm text-slate-400">
                {contact_info.phone_number}
              </p>
            </div>
          </a>
        )}

        {/* MESSENGER */}
        {contact_info?.facebook && (
          <a
            href={contact_info.facebook}
            target="_blank"
            className="group flex items-center gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-pink-500/10 text-pink-400 group-hover:scale-110 transition">
              <FaFacebookMessenger />
            </div>

            <div>
              <h3 className="text-base font-semibold text-white">
                Messenger
              </h3>
              <p className="text-sm text-slate-400">
                Chat instantly
              </p>
            </div>
          </a>
        )}

        {/* WHATSAPP */}
        {contact_info?.whatsapp_number && (
          <a
            href={`https://wa.me/${contact_info.whatsapp_number}`}
            target="_blank"
            className="group flex items-center gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-lg hover:shadow-2xl hover:border-green-500/40 transition"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-500/10 text-green-400 group-hover:scale-110 transition">
              <FaWhatsapp />
            </div>

            <div>
              <h3 className="text-base font-semibold text-green-400">
                WhatsApp Support
              </h3>
              <p className="text-sm text-slate-400">
                Fastest response (Recommended)
              </p>
            </div>
          </a>
        )}

        {/* EMAIL */}
        {contact_info?.email && (
          <a
            href={`mailto:${contact_info.email}`}
            className="group flex items-center gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-yellow-500/10 text-yellow-400 group-hover:scale-110 transition">
              <FaEnvelope />
            </div>

            <div>
              <h3 className="text-base font-semibold text-white">
                Email Support
              </h3>
              <p className="text-sm text-slate-400">
                {contact_info.email}
              </p>
            </div>
          </a>
        )}

      </div>

      {/* FOOTER */}
      <div className="mt-12 text-center p-6 rounded-2xl bg-slate-900 border border-slate-800">

        <h3 className="text-lg font-semibold mb-2">
          Need help with order?
        </h3>

        <p className="text-sm text-slate-400">
          Payment issue • Delivery delay • Top-up problem — আমরা 24/7 support দিচ্ছি
        </p>

      </div>

    </div>
  );
}