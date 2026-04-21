"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSiteSettings } from '@/context/SiteSettingsContext';

export default function ProfileAddMoneyPage() {
    const [user, setUser] = useState<any>(null);
    const [amount, setAmount] = useState('');
    const [isValidAmount, setIsValidAmount] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [paymentType, setPaymentType] = useState<'instant' | 'manual'>('manual');
    const [manualMethods, setManualMethods] = useState<any[]>([]);
    const [selectedMethod, setSelectedMethod] = useState<any>(null);
    const [senderNumber, setSenderNumber] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const router = useRouter();
    const siteSettings = useSiteSettings();
    const [successModal, setSuccessModal] = useState(false);
const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const storedUser = localStorage.getItem('user-info');
        if (!storedUser) {
            router.push('/login');
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [router]);

    useEffect(() => {
        const fetchManualMethods = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment-methods`);
                if (response.ok) {
                    const data = await response.json();
                    setManualMethods(data);
                    if (data.length > 0) {
                        setSelectedMethod(data[0]);
                    }
                }
            } catch (err) {
                console.error("Error fetching manual methods:", err);
            }
        };
        fetchManualMethods();
    }, []);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAmount(value);
        if (/^\d+(\.\d{1,2})?$/.test(value) && parseFloat(value) > 0) {
            setIsValidAmount(true);
            setError('');
        } else {
            setIsValidAmount(false);
            setError('Please enter a valid amount');
        }
    };

    const handleManualSubmit = async () => {
        if (!isValidAmount) return;
        if (!selectedMethod) return setError("Please select a payment method");
        if (!senderNumber.trim()) return setError("Please enter sender number");
        if (!transactionId.trim()) return setError("Please enter transaction ID");

        setLoading(true);
        setError('');

        const payload = {
            full_name: user?.name,
            email: user?.email,
            amount: amount,
            user_id: user?.id,
            productId: 6, // Using a fallback product ID for the manual endpoint
            quantity: 1,
            selectedRechargeType: 'Wallet Topup',
            payment_method_id: selectedMethod.id,
            sender_number: senderNumber.trim(),
            transaction_id: transactionId.trim(),
            accountInfo: { type: 'Wallet', amount: amount }
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/manual`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();
            if (response.ok && data.status === "success") {
                setSuccessMessage("Top-up request submitted! Please wait for admin verification.");
                setSuccessModal(true);
       } else {
                setError(data.message || 'Submission failed');
            }
        } catch (err: any) {
            setError('Submission failed: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async (paymentData: any) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/payment/initiate-wallet-topup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(paymentData),
            });

            const data = await response.json();

            if (response.ok && data.payment_url) {
                window.location.href = data.payment_url;
            } else {
                setError(data.message || 'Payment initiation failed');
            }
        } catch (error: any) {
            setError('Payment initiation failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBuyNow = () => {
        if (!user) return;
        if (paymentType === 'manual') {
            handleManualSubmit();
            return;
        }
        setLoading(true);
        const productDetails = {
            full_name: user.name,
            email: user.email,
            amount: amount,
            user_id: user.id,
        };
        localStorage.setItem('productDetails', JSON.stringify(productDetails));
        handlePayment(productDetails);
    };

    if (!user || !siteSettings) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    const { contact_info } = siteSettings;

    return (
    <div className="container mx-auto px-2 md:px-4 py-6 md:py-10 max-w-6xl bg-gradient-to-b from-[#070c18] via-[#0b1224] to-[#05070d] text-white">

        {/* MAIN CARD */}
        <div className="bg-[#0f172a] border border-white/10 rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden">

            {/* HEADER */}
            <div className="px-4 sm:px-6 py-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 backdrop-blur-xl bg-white/5">

                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center shadow-lg">
                        💰
                    </div>

                    <h2 className="text-base sm:text-xl font-bold">
                        Add Money to Wallet
                    </h2>
                </div>

                <div className="flex p-1 rounded-xl bg-white/10 backdrop-blur-md w-full sm:w-auto">
                    <button
                        onClick={() => setPaymentType('instant')}
                        className={`w-1/2 sm:w-auto px-4 py-2 rounded-lg text-xs font-bold transition ${
                            paymentType === 'instant'
                                ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-md'
                                : 'text-gray-300'
                        }`}
                    >
                        Instant
                    </button>

                    <button
                        onClick={() => setPaymentType('manual')}
                        className={`w-1/2 sm:w-auto px-4 py-2 rounded-lg text-xs font-bold transition ${
                            paymentType === 'manual'
                                ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-md'
                                : 'text-gray-300'
                        }`}
                    >
                        Manual
                    </button>
                </div>
            </div>

            {/* BODY */}
            <div className="p-4 sm:p-8">

                <div className="relative max-w-md mx-auto">

                    {/* glow background */}
                    <div className="absolute inset-0 bg-pink-500/10 blur-3xl rounded-full"></div>

                    <div className="relative bg-[#0b1224]/80 border border-white/10 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-lg">

                        <label className="block text-center text-xs sm:text-sm text-gray-400 uppercase mb-3">
                            Enter Amount
                        </label>

                        {/* AMOUNT */}
                        <div className="relative flex justify-center mb-6">

                            <span className="absolute left-4 sm:left-6 text-2xl sm:text-3xl text-gray-400">
                                ৳
                            </span>

                            <input
                                type="text"
                                value={amount}
                                onChange={handleAmountChange}
                                placeholder="0.00"
                                className="w-full text-center text-3xl sm:text-5xl font-bold bg-transparent border-b-2 border-white/10 focus:border-pink-500 outline-none py-3"
                            />
                        </div>

                        {/* MANUAL SECTION */}
                        {paymentType === 'manual' && (
                            <div className="space-y-5">

                                {/* METHODS */}
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase mb-2">
                                        Payment Method
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {manualMethods.map((m) => (
                                            <button
                                                key={m.id}
                                                onClick={() => setSelectedMethod(m)}
                                                className={`px-4 py-2 text-xs rounded-xl border transition ${
                                                    selectedMethod?.id === m.id
                                                        ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white border-transparent shadow-md'
                                                        : 'bg-white/5 text-gray-300 border-white/10'
                                                }`}
                                            >
                                                {m.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* ACCOUNT */}
                                {selectedMethod && (
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                                        <p className="text-[10px] text-pink-400 uppercase">
                                            Send Money To
                                        </p>
                                        <p className="text-lg font-bold text-white">
                                            {selectedMethod.phone}
                                        </p>
                                    </div>
                                )}

                                {/* INPUTS */}
                                <div className="space-y-3">

                                    <input
                                        value={senderNumber}
                                        onChange={(e) => setSenderNumber(e.target.value)}
                                        placeholder="Sender Number"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-pink-500"
                                    />

                                    <input
                                        value={transactionId}
                                        onChange={(e) => setTransactionId(e.target.value)}
                                        placeholder="Transaction ID"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm uppercase outline-none focus:border-pink-500"
                                    />
                                </div>
                            </div>
                        )}

                        {/* ERROR */}
                        {error && (
                            <p className="text-red-400 text-sm text-center mt-4">
                                {error}
                            </p>
                        )}

                        {/* BUTTON */}
                        <button
                            onClick={handleBuyNow}
                            disabled={!isValidAmount || loading}
                            className="w-full mt-6 py-3 rounded-xl font-bold text-white
                            bg-gradient-to-r from-pink-500 to-red-500
                            hover:from-pink-600 hover:to-red-600
                            shadow-lg transition disabled:opacity-50"
                        >
                            {loading ? "Processing..." : "Continue Payment"}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* VIDEO SECTION */}
        {contact_info?.how_to_add_money && (
            <div className="mt-6 bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden">

                <div className="px-4 py-4 border-b border-white/10 text-white font-bold">
                    How to Add Money
                </div>

                <div className="p-3 sm:p-6">
                    <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10">
                        <iframe
                            src={contact_info.how_to_add_money}
                            className="w-full h-full"
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>
        )}


        {successModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

    <div className="bg-white w-[90%] max-w-md p-6 rounded-2xl shadow-xl text-center">

      <div className="text-green-500 text-5xl">✔</div>

      <h2 className="text-xl font-bold mt-3 text-gray-800">
        Success!
      </h2>

      <p className="text-gray-600 mt-2">
        {successMessage}
      </p>

      <button
        onClick={() => router.push("/profile/order")}
        className="mt-5 w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold"
      >
        Go to Orders
      </button>

    </div>

  </div>
)}

    </div>
);
}
