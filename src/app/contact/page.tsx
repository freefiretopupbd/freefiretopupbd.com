"use client";
import React from 'react';
import { useSiteSettings } from '@/context/SiteSettingsContext';
import { FaPhoneAlt, FaFacebookMessenger, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

export default function ContactPage() {
    const siteSettings = useSiteSettings();

    if (!siteSettings) {
        return <div className="min-h-[50vh] flex items-center justify-center">Loading...</div>;
    }

    const { contact_info } = siteSettings;

    return (
        <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-gradient-to-br from-pink-200 to-red-100 rounded-full opacity-50 blur-3xl p-10 z-0"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-gradient-to-tr from-blue-200 to-indigo-100 rounded-full opacity-50 blur-3xl p-10 z-0"></div>

                <div className="relative z-10 p-8 md:p-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 mb-4 tracking-tight">
                        Contact Us
                    </h1>
                    <p className="text-gray-500 mb-10 max-w-xl mx-auto">
                        Need help or have any questions? We're here for you! Reach out to us through any of the channels below.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 relative">
                        {contact_info?.phone_number && (
                            <a href={`tel:${contact_info.phone_number}`} className="group flex flex-col items-center justify-center p-6 bg-blue-50/50 hover:bg-blue-50 border border-blue-100 rounded-2xl transition-all hover:shadow-md hover:-translate-y-1">
                                <div className="w-14 h-14 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform">
                                    <FaPhoneAlt />
                                </div>
                                <h3 className="font-bold text-gray-800 mb-1">Direct Call</h3>
                                <p className="text-sm text-gray-500 text-center">Call us directly for immediate assistance.</p>
                            </a>
                        )}

                        {contact_info?.facebook && (
                            <a href={contact_info.facebook} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-center p-6 bg-pink-50/50 hover:bg-pink-50 border border-pink-100 rounded-2xl transition-all hover:shadow-md hover:-translate-y-1">
                                <div className="w-14 h-14 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform">
                                    <FaFacebookMessenger />
                                </div>
                                <h3 className="font-bold text-gray-800 mb-1">Messenger</h3>
                                <p className="text-sm text-gray-500 text-center">Chat with us live on Facebook Messenger.</p>
                            </a>
                        )}

                        {contact_info?.whatsapp_number && (
                            <a href={`https://wa.me/${contact_info.whatsapp_number}`} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-center p-6 bg-green-50/50 hover:bg-green-50 border border-green-100 rounded-2xl transition-all hover:shadow-md hover:-translate-y-1">
                                <div className="w-14 h-14 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform">
                                    <FaWhatsapp />
                                </div>
                                <h3 className="font-bold text-gray-800 mb-1">WhatsApp</h3>
                                <p className="text-sm text-gray-500 text-center">Send us a message on WhatsApp for fast replies.</p>
                            </a>
                        )}

                        {contact_info?.email && (
                            <a href={`mailto:${contact_info.email}`} target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center justify-center p-6 bg-yellow-50/50 hover:bg-yellow-50 border border-yellow-100 rounded-2xl transition-all hover:shadow-md hover:-translate-y-1">
                                <div className="w-14 h-14 bg-yellow-100 text-yellow-500 rounded-full flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform">
                                    <FaEnvelope />
                                </div>
                                <h3 className="font-bold text-gray-800 mb-1">Email Support</h3>
                                <p className="text-sm text-gray-500 text-center">Drop us an email for detailed inquiries.</p>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
