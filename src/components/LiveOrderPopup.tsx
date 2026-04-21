"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";

export default function LiveOrderPopup() {
  const [queue, setQueue] = useState<any[]>([]);
  const [active, setActive] = useState<any[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // -------------------------
  // SOUND PLAY FUNCTION
  // -------------------------
  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  // -------------------------
  // FETCH ORDERS
  // -------------------------
  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/recent-orders`
      );

      if (res.data && Array.isArray(res.data)) {
        setQueue((prev) => [...prev, ...res.data]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // -------------------------
  // PROCESS QUEUE → STACK
  // -------------------------
  useEffect(() => {
    if (queue.length === 0) return;

    const interval = setInterval(() => {
      setQueue((prev) => {
        if (prev.length === 0) {
          clearInterval(interval);
          return [];
        }

        const [first, ...rest] = prev;

        // // play sound 🔊
        // playSound();

        // add to stack (max 3 visible)
        setActive((old) => {
          const updated = [first, ...old];
          return updated.slice(0, 1);
        });

        // remove after 5 sec
        setTimeout(() => {
          setActive((old) => old.filter((x) => x !== first));
        }, 3000);

        return rest;
      });
    }, 7000);

    return () => clearInterval(interval);
  }, [queue]);

  // -------------------------
  // INITIAL FETCH LOOP
  // -------------------------
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <audio ref={audioRef} src="/sounds/notify.mp3" />

      {/* PREMIUM NOTIFICATION STACK */}
      <div className="fixed bottom-6 left-6 z-[9999] space-y-3">

        {active.map((item, index) => (
          <div
            key={index}
            className="w-[300px] rounded-2xl
            bg-[#0b1224]/90 backdrop-blur-xl
            border border-white/10
            shadow-[0_10px_30px_rgba(0,0,0,0.4)]
            text-white px-4 py-3
            animate-in fade-in slide-in-from-bottom-3"
            style={{
              transform: `translateY(${index * -8}px) scale(${1 - index * 0.03})`,
              opacity: 1 - index * 0.1,
              zIndex: 50 - index,
            }}
          >

            {/* TOP ROW */}
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-2">

                {/* pulse dot */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
                </span>

                <p className="text-xs font-semibold text-white">
                  New Order
                </p>

              </div>

              <span className="text-[10px] text-gray-400">
                just now
              </span>

            </div>

            {/* CONTENT */}
            <div className="mt-2">
              <p className="text-xs text-gray-200">
                <span className="text-white font-bold">
                  {item.customer_name}
                </span>{" "}
                placed an order
              </p>

              <p className="text-xs text-gray-400 mt-1">
                🎮 {item.diamond}
              </p>
            </div>

            {/* bottom accent line */}
            <div className="mt-3 h-[2px] w-full bg-gradient-to-r from-pink-500/40 to-transparent rounded-full"></div>

          </div>
        ))}

      </div>
    </>
  );
}