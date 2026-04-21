"use client";
import React, { useState } from 'react';

export default function NoticeBanner({ notice }: { notice: any }) {
    const [isVisible, setIsVisible] = useState(true);

    if (!notice || notice.status !== "1" || !isVisible) {
        return null;
    }

    return (
        <section className="w-full mb-6">

            <div className="w-full max-w-7xl mx-auto ">

                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#0b1224] shadow-xl">

                    {/* glow */}
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/20 blur-3xl rounded-full"></div>
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-500/20 blur-3xl rounded-full"></div>

                    <div className="flex items-start justify-between p-5">

                        <div className="flex gap-3">

                            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">
                                🔔
                            </div>

                            <div className="space-y-1">

                                <h2 className="text-white font-semibold text-base flex items-center gap-2">
                                    Notice Update
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                                        Important
                                    </span>
                                </h2>

                                <div className="text-gray-300 text-sm leading-relaxed">
                                    {notice.message ? (
                                        <div dangerouslySetInnerHTML={{ __html: notice.message }} />
                                    ) : (
                                        "No message available"
                                    )}
                                </div>

                            </div>
                        </div>

                        <button
                            onClick={() => setIsVisible(false)}
                            className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition flex items-center justify-center"
                        >
                            ✕
                        </button>

                    </div>

                </div>

            </div>

        </section>
    );
}
