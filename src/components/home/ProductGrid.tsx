import React from 'react';
import Link from 'next/link';

export default function ProductGrid({ products }: { products: any[] }) {
    if (!products || products.length === 0) return null;

    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-8 pb-4 md:pb-10 place-items-center justify-center">
            {products.map((item) => (
                <div key={item.id} className="group relative transition-all duration-300 hover:-translate-y-2">
                    <Link href={`/topup/${item.code}`} className="block">
                        <div className="relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 bg-#0f1a2e border border-gray-100">
                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-red-500/0 group-hover:bg-red-500/10 transition-colors z-10 rounded-2xl"></div>
                            
                            <img 
                                src={`${process.env.NEXT_PUBLIC_BASE_URL}/storage/products/${item.gallery}`} 
                                alt={item.display_title || 'Product'} 
                                className="w-full  aspect-[4/3] transform group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <h1 className="capitalize text-[11px] md:text-sm text-center pt-3 font-medium text-gray-200 group-hover:text-red-600 transition-colors px-1">
                            {item.display_title}
                        </h1>
                    </Link>
                </div>
            ))}
        </div>
    );
}
