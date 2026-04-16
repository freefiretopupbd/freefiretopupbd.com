"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function ResetPasswordContent() {
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        setEmail(searchParams.get('email') || '');
        setToken(searchParams.get('token') || '');
    }, [searchParams]);

    async function handleResetPassword(e: React.FormEvent) {
        e.preventDefault();
        setErrors([]);
        setMessage("");

        if (password !== passwordConfirmation) {
            setErrors(["Passwords do not match"]);
            return;
        }

        setIsLoading(true);

        try {
            const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reset_password`, {
                method: 'POST',
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({ email, token, password, password_confirmation: passwordConfirmation })
            });

            const data = await result.json();

            if (data.error) {
                setErrors(Array.isArray(data.error) ? data.error : [data.error]);
            } else {
                setMessage(data.message || "Password reset successfully!");
                setTimeout(() => router.push('/login'), 2000);
            }
        } catch (error) {
            console.error("Reset password error:", error);
            setErrors(["An error occurred. Please try again."]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 relative overflow-hidden">
             {/* Decorative Background */}
             <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-pink-200 rounded-full opacity-20 blur-3xl p-10 z-0"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 bg-violet-200 rounded-full opacity-20 blur-3xl p-10 z-0"></div>

            <div className="max-w-md w-full relative z-10 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-pink-500 to-violet-500 p-8 text-center">
                    <h2 className="text-3xl font-extrabold text-white mb-2">Set New Password</h2>
                    <p className="text-pink-100 text-sm opacity-90">Enter your new secure password below</p>
                </div>

                <div className="p-8">
                    {errors.length > 0 && (
                        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6 relative shadow-sm text-sm">
                             <button
                                className="absolute top-2 right-2 text-red-400 hover:text-red-600 focus:outline-none"
                                onClick={() => setErrors([])}
                            >
                                ✕
                            </button>
                            {errors.map((error, idx) => (
                                <p key={idx}>{error}</p>
                            ))}
                        </div>
                    )}
                    
                    {message && (
                        <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-6 shadow-sm text-sm">
                            <p className="font-medium flex items-center gap-2"><span className="text-lg">✓</span> {message}</p>
                            <p className="text-xs mt-1">Redirecting to login...</p>
                        </div>
                    )}

                    <form onSubmit={handleResetPassword} className="space-y-5">
                         {/* Hidden fields just for accessibility/completeness, though strictly not needed in UI */}
                        <input type="hidden" name="email" value={email} />
                        <input type="hidden" name="token" value={token} />

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-shadow shadow-sm"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Confirm New Password</label>
                            <input
                                type="password"
                                required
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-shadow shadow-sm"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-all shadow-md hover:shadow-lg disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Processing...
                                    </span>
                                ) : "Reset Password"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <ResetPasswordContent />
        </React.Suspense>
    );
}
