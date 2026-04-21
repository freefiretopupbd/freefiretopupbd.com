"use client";
import React, { useEffect, Suspense } from 'react';
import Link from 'next/link';

function PaymentCancelContent() {
    // Assuming backend might pass userId via some means or we get from local storage.
    // Given the old code relies on localStorage and the user ID from it:

    useEffect(() => {
        const updateOrderStatus = async (userId: string) => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cancel-payment/${userId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId }),
                });
                if (!response.ok) {
                    console.error('Network response was not ok');
                } else {
                    console.log('Order status updated successfully');
                }
            } catch (error) {
                console.error('Error updating order status:', error);
            }
        };

        const fetchUserData = () => {
            try {
                const userObj = localStorage.getItem('user-info');
                if (userObj) {
                    const user = JSON.parse(userObj);
                    if (user && user.id) {
                        updateOrderStatus(user.id);
                    }
                }
            } catch (error) {
                 console.error('Error handling cancel logic:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="container mx-auto px-2 md:px-4 py-6 md:py-10 max-w-6xl bg-gradient-to-b from-[#070c18] via-[#0b1224] to-[#05070d] text-white">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-red-100 relative">
                <div className="bg-gradient-to-r from-red-500 to-rose-600 p-8 text-center text-white">
                    <div className="w-24 h-24 bg-white text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl shadow-lg border-4 border-red-200">
                        ✕
                    </div>
                    <h1 className="text-3xl font-extrabold mb-2">Payment Cancelled</h1>
                    <p className="text-red-100 text-lg">Your transaction was not completed.</p>
                </div>

                <div className="p-8 md:p-12 text-center">
                    <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                        It looks like you cancelled the payment process or an error occurred during the transaction. Your account has <span className="font-bold text-gray-800">not</span> been charged.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/topup" className="bg-gradient-to-r from-pink-500 to-violet-500 text-white font-bold py-3 px-8 rounded-full shadow-md hover:-translate-y-0.5 transition-transform flex-1 max-w-[200px] mx-auto sm:mx-0">
                            Try Again
                        </Link>
                        <Link href="/" className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-8 rounded-full shadow-sm transition-colors flex-1 max-w-[200px] mx-auto sm:mx-0">
                            Return Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function PaymentCancelPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <PaymentCancelContent />
        </Suspense>
    );
}
