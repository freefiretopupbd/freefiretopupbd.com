"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function RegisterContent() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingGoogle, setLoadingGoogle] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState("");

    const router = useRouter();
    const searchParams = useSearchParams();

    const signup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors([]);
        setSuccessMessage("");

        if (password !== confirmPassword) {
            setErrors(["Password and Confirm Password must match."]);
            setLoading(false);
            return;
        }

        const item = {
            name,
            email,
            password,
            password_confirmation: confirmPassword,
            is_active: true,
            phone
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
                method: 'POST',
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify(item)
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrors(errorData.error ? [errorData.error] : ["Failed to register. Please try again later."]);
                return;
            }

            // ✅ SUCCESS
            setSuccessMessage("Registration successful! Redirecting to login...");

            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setPhone("");

            setTimeout(() => {
                router.push('/login');
            }, 1500);

        } catch (error) {
            setErrors(["Failed to register. Please try again later."]);
        } finally {
            setLoading(false);
        }
    };

    const googleLogin = () => {
        setLoadingGoogle(true);
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
    };

    useEffect(() => {
        const handleGoogleCallbackRegister = async () => {
            const email = searchParams.get('email');
            const name = searchParams.get('name');
            const password = searchParams.get('password');
            const google_id = searchParams.get('google_id');

            if (!email || !name || !password || !google_id) return;

            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google/callbackregister?email=${email}&name=${name}&password=${password}&google_id=${google_id}`
                );

                const data = await response.json();

                if (response.ok) {
                    setSuccessMessage('Registration successful! Redirecting to login...');

                    setTimeout(() => {
                        router.push('/login');
                    }, 1500);
                } else {
                    setErrors([data.error || 'Failed to register with Google. Please try again.']);
                }
            } catch (error) {
                setErrors(['Failed to register with Google. Please try again.']);
            }
        };

        if (searchParams.get('email') && searchParams.get('name')) {
            handleGoogleCallbackRegister();
        }
    }, [searchParams, router]);

    return (
        <div className="container mx-auto px-4 py-12 flex justify-center min-h-[70vh]">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

                <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
                    Create Account
                </h1>

                <button
                    type="button"
                    onClick={googleLogin}
                    disabled={loadingGoogle}
                    className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors shadow-sm disabled:opacity-70"
                >
                    Register with Google
                </button>

                <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink-0 mx-4 text-gray-400 text-sm">
                        or sign up with email
                    </span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                {errors.length > 0 && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                        {errors.map((error, idx) => (
                            <p key={idx} className="text-red-600 text-sm text-center">
                                {error}
                            </p>
                        ))}
                    </div>
                )}

                {successMessage && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm text-center font-medium">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={signup} className="space-y-4">

                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required className="w-full p-2 border rounded-xl" />

                    <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" required className="w-full p-2 border rounded-xl" />

                    <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full p-2 border rounded-xl" />

                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full p-2 border rounded-xl" />

                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required className="w-full p-2 border rounded-xl" />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-pink-500 text-white py-3 rounded-xl mt-4"
                    >
                        {loading ? "Registering..." : "Create Account"}
                    </button>

                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Already a member?{" "}
                    <Link href="/login" className="text-pink-600 font-bold">
                        Sign In Now
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default function RegisterPage() {
    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <RegisterContent />
        </React.Suspense>
    );
}