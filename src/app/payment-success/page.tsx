"use client";
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface PaymentDetails {
    order_id: number | string;
    trx_id: string;
    dateTime: string;
    topUpGame: { name: string } | null;
    totalAmount: number | string;
    payment_method: string;
    playerIds: Record<string, string>;
    user: { name: string; email: string };
    selectedRechargeType: string;
    paymentType: string;
}

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            const orderId = searchParams.get('trx_id');
            if (orderId) {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment-details/${orderId}`);
                    if (!response.ok) throw new Error('Network response was not ok');
                    const data = await response.json();
                    setPaymentDetails(data);
                } catch (error) {
                    console.error('Error fetching payment details:', error);
                    setError("Could not load order details.");
                }
            } else {
                setError("No transaction ID found.");
            }
        };

        fetchPaymentDetails();
    }, [searchParams]);

    if (error) {
        return (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-2xl mx-auto mt-10 p-8">
                <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
                    ✕
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Details Not Found</h1>
                <p className="text-gray-500 mb-8">{error}</p>
                <Link href="/" className="bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-3 px-8 rounded-full shadow-md hover:-translate-y-0.5 transition-transform inline-block">
                    Return to Home
                </Link>
            </div>
        );
    }

    if (!paymentDetails) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    const {
        trx_id,
        dateTime,
        topUpGame,
        totalAmount,
        payment_method,
        playerIds,
        user,
        selectedRechargeType,
        paymentType
    } = paymentDetails;

    return (
        <div className="container mx-auto px-2 md:px-4 py-6 md:py-10 max-w-6xl bg-gradient-to-b from-[#070c18] via-[#0b1224] to-[#05070d] text-white">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative">
                <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-8 text-center text-white relative">
                    <div className="w-20 h-20 bg-white text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl shadow-lg">
                        ✓
                    </div>
                    <h1 className="text-3xl font-extrabold mb-2">Payment Successful!</h1>
                    <p className="text-green-50">Thank you for your order. We&apos;ve received your payment.</p>
                </div>

                <div className="p-6 md:p-10">
                    <div className="bg-gray-50 rounded-2xl p-6 mb-8 border border-gray-100 text-center relative">
                        <div className="absolute top-2 right-4">
                            <span className="text-[10px] font-bold bg-gray-200 text-gray-600 px-2 py-0.5 rounded">Order #{paymentDetails.order_id}</span>
                        </div>
                        <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">Transaction ID</p>
                        <p className="font-mono text-2xl font-bold text-gray-800">{trx_id}</p>
                        <p className="text-xs text-gray-400 mt-2">{dateTime}</p>
                    </div>

                    <div className="space-y-8">
                         {/* Order Summary */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center text-sm">🛒</span>
                                Order Summary
                            </h3>
                            <div className="bg-white border text-sm border-gray-200 rounded-xl overflow-hidden">
                                <div className="flex justify-between p-4 border-b border-gray-100 bg-gray-50 font-bold text-gray-700">
                                    <span>Product</span>
                                    <span>Amount</span>
                                </div>
                                <div className="flex justify-between p-4 border-b border-gray-100 text-gray-600">
                                    <span>{topUpGame?.name || "Unknown Product"}</span>
                                    <span>৳ {totalAmount}</span>
                                </div>
                                <div className="flex justify-between p-4 border-b border-gray-100 bg-gray-50">
                                    <span className="text-gray-500">Payment Method</span>
                                    <span className="font-medium text-gray-800 capitalize">{payment_method}</span>
                                </div>
                                <div className="flex justify-between p-4 font-bold text-lg text-gray-800 bg-gray-50">
                                    <span>Total Paid</span>
                                    <span className="text-pink-600">৳ {totalAmount}</span>
                                </div>
                            </div>
                        </div>

                         {/* Player Details */}
                         {playerIds && Object.keys(playerIds).length > 0 && (
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center text-sm">🎮</span>
                                    Account Details
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                     {Object.entries(playerIds).map(([key, value]) => (
                                         <div key={key} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                             <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-medium">{key.replace(/_/g, ' ')}</p>
                                             <p className="font-bold text-gray-800">{value as string}</p>
                                         </div>
                                     ))}
                                </div>
                            </div>
                        )}

                        {/* Top-up Details */}
                        {topUpGame && (
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center text-sm">💎</span>
                                    Top-Up Package
                                </h3>
                                <div className="bg-purple-50 p-5 rounded-2xl border border-purple-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-purple-600 font-medium text-sm">Product</span>
                                        <span className="font-bold text-purple-900 text-right">{topUpGame.name}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-purple-600 font-medium text-sm">Package</span>
                                        <span className="font-bold text-purple-900 text-right">{selectedRechargeType}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-purple-600 font-medium text-sm">Category</span>
                                        <span className="font-bold text-purple-900 capitalize text-right">{paymentType}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Billing Details */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center text-sm">👤</span>
                                Billing Details
                            </h3>
                            <div className="bg-white border border-gray-200 p-5 rounded-xl flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
                                    🤠
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">{user?.name}</p>
                                    <p className="text-gray-500 text-sm">{user?.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100 text-center">
                            <Link href="/profile/order" className="bg-gray-800 hover:bg-black text-white font-bold py-4 px-8 rounded-full shadow-md transition-all inline-block hover:-translate-y-0.5">
                                View Full Order History
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <PaymentSuccessContent />
        </Suspense>
    );
}
