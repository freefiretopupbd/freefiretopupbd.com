import React from 'react';
import type { Metadata } from 'next';
import HomeCarousel from '@/components/home/HomeCarousel';
import HomePageModal from '@/components/home/HomePageModal';
import ProductGrid from '@/components/home/ProductGrid';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import NoticeBanner from '@/components/home/NoticeBanner';

export const metadata: Metadata = {
  title: 'Free Fire Top Up BD - Instant Diamond Top Up Bangladesh',
  description: 'Buy Free Fire diamonds instantly in Bangladesh with secure and fast delivery.',
  keywords: ['free fire diamond top up', 'diamond bd', 'ff top up bangladesh'],
  openGraph: {
    title: 'Free Fire Top Up BD',
    description: 'Instant Free Fire diamond top up in Bangladesh',
    url: 'https://freefiretopupbd.com',
    siteName: 'Free Fire Top Up BD',
    type: 'website',
  },
};

async function fetchSiteSettings() {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://backend.freefiretopupbd.com';
        const res = await fetch(`${apiUrl}/api/frontend-settings`, {
            next: { revalidate: 60 },
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
            }
        });

        if (!res.ok) return null;

        return (await res.json()).site_settings;
    } catch {
        return null;
    }
}

async function fetchProducts(page: number) {
    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://backend.freefiretopupbd.com';
        const res = await fetch(`${apiUrl}/api?page=${page}`, {
            next: { revalidate: 60 },
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
            }
        });

        if (!res.ok) return [];
            
        return (await res.json()).data || [];
    } catch {
        return [];
    }
}

// 🔥 IMPORTANT: no-store (live data)
async function fetchRecentOrders() {
    try {
        const res = await fetch('http://backend.freefiretopupbd.com/api/recent-orders', {
            cache: 'no-store'
        });

        const json = await res.json();

        // API direct array return করে
        return Array.isArray(json) ? json : (json.data || []);
    } catch {
        return [];
    }
}

export default async function HomePage({ searchParams }: { searchParams: { page?: string } }) {
    const params = await searchParams;
    const page = Number(params.page) || 1;
    
    const settings = await fetchSiteSettings();
    const products = await fetchProducts(page);
    const recentOrders = await fetchRecentOrders();

    const mobileGames = products.filter((item: any) => {
        try {
            const parsed = typeof item.input_fields === 'string' ? JSON.parse(item.input_fields) : (item.input_fields || {});
            return parsed.is_quantity_selection_allowed === "NO";
        } catch { return false; }
    });

    const giftCards = products.filter((item: any) => {
        try {
            const parsed = typeof item.input_fields === 'string' ? JSON.parse(item.input_fields) : (item.input_fields || {});
            return parsed.is_quantity_selection_allowed === "YES";
        } catch { return false; }
    });

    return (
        <div className="container mx-auto px-2 md:px-4 py-6 md:py-10 max-w-6xl bg-gradient-to-b from-[#070c18] via-[#0b1224] to-[#05070d] text-white">
            <HomePageModal initialData={settings?.notice_popup} />
            <NoticeBanner notice={settings?.notice} />

            <div className="container mx-auto">
                {settings?.banner_images && <HomeCarousel banners={settings.banner_images} />}

                {/* Mobile Games */}
                <div className="text-center mb-6 mt-10">
                    <div className="flex items-center justify-center px-4 py-4 md:py-8">
                        <hr className="flex-grow border-gray-300" />
                        <h1 className="text-2xl sm:text-3xl font-bold mx-4 text-white-900 font-primary">Free Fire Top Up BD</h1>
                        <hr className="flex-grow border-gray-300" />
                    </div>
                </div>
                <ProductGrid products={mobileGames} />

                {/* Gift Cards */}
                <div className="text-center mb-6 mt-10">
                    <div className="flex items-center justify-center px-4 py-4 md:py-8">
                        <hr className="flex-grow border-gray-300" />
                        <h3 className="text-2xl sm:text-3xl font-bold mx-4 text-white-900 font-primary">Gift Cards/Vouchers</h3>
                        <hr className="flex-grow border-gray-300" />
                    </div>
                </div>
                <ProductGrid products={giftCards} />

                {/* Pagination*/}
                <div className="flex items-center justify-center gap-4 py-8">
                    <Link href={`/?page=${page > 1 ? page - 1 : 1}`} className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 text-gray-700 font-bold transition-all">
                        <FaArrowLeft /> Previous
                    </Link>
                    <span className="font-bold text-lg text-gray-700">Page {page}</span>
                    <Link href={`/?page=${page + 1}`} className="flex items-center gap-2 px-6 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 text-gray-700 font-bold transition-all">
                        Next <FaArrowRight />
                    </Link>
                </div>
                

                {/* 🔥 RECENT ORDERS */}
<div className="w-full px-3 md:px-0">

<h2 className="text-center text-3xl font-extrabold my-10 text-white tracking-wide">
    Recent Orders
</h2>

<div className="w-full max-w-7xl mx-auto grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">

    {Array.isArray(recentOrders) && recentOrders.length > 0 ? (

        recentOrders.slice(0, 10).map((order: any, index: number) => (

            <div
                key={index}
                className="relative group rounded-2xl p-[1px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-lg"
            >

                <div className="bg-[#0b0f1a] rounded-2xl p-5 h-full transition-all duration-300 group-hover:scale-[1.02]">

                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-semibold text-lg truncate">
                            {order.diamond}
                        </h4>

                        <span className="text-[11px] px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                            {order.status}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                        <p className="text-gray-300 text-sm">
                            {order.customer_name}
                        </p>
                    </div>

                    <p className="text-gray-400 text-sm mb-3">
                        Player ID: <span className="text-white">{order.player_id}</span>
                    </p>

                </div>

            </div>

        ))

    ) : (
        <p className="text-center text-gray-400 col-span-3">
            No recent orders found
        </p>
    )}

</div>

</div>

                {/* Download App */}
                <div className="my-10">
                    <a href="https://play.google.com/store/apps/" target="_blank" rel="noopener noreferrer" className="flex items-center bg-pink-50 max-w-sm mx-auto rounded-xl p-4 border-2 border-pink-500/60 shadow-md hover:shadow-lg transition-shadow">
                        <img src="https://bakgroma.shop/assets/images/stores/DEU/google-play.png" alt="Google Play" className="h-[70px] mr-5" />
                        <div>
                            <h4 className="font-medium text-gray-800">Download our mobile app now</h4>
                            <p className="font-bold text-pink-600 mt-1">Download Now →</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
