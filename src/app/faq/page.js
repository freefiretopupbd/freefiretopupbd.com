"use client";

import { useState } from "react";
import { FaPlus, FaMinus, FaWhatsapp } from "react-icons/fa";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");

  const faqs = [
    {
      category: "General",
      items: [
        {
          q: "How to top-up Free Fire diamonds?",
          a: "Enter your Free Fire Player ID, select your desired diamond package, and complete the payment.",
        },
        {
          q: "Do I need to log in to my Free Fire account?",
          a: "No. Only Player ID is required. Never share your password.",
        },
        {
          q: "Is this website safe?",
          a: "Yes, we are a trusted top-up service with secure transactions.",
        },
      ],
    },
    {
      category: "Payment",
      items: [
        {
          q: "What payment methods are available?",
          a: "We support bKash, Nagad, Rocket and other local methods.",
        },
        {
          q: "Payment successful but not received?",
          a: "Wait 5–10 minutes. If still not received, contact support.",
        },
        {
          q: "Can I cancel my order?",
          a: "Once payment is completed, cancellation is not possible.",
        },
      ],
    },
    {
      category: "Delivery",
      items: [
        {
          q: "How long does delivery take?",
          a: "Most orders are instant. Sometimes it may take up to 10–15 minutes.",
        },
        {
          q: "Why is my order delayed?",
          a: "Delay may occur due to server or verification issues.",
        },
      ],
    },
    {
      category: "Security",
      items: [
        {
          q: "Is my account safe?",
          a: "Yes. We never ask for password or login details.",
        },
        {
          q: "Do you store my data?",
          a: "Only necessary order info is stored for support.",
        },
      ],
    },
    {
      category: "Refund",
      items: [
        {
          q: "Can I get a refund?",
          a: "Refund only applies if delivery fails. It will be credited to wallet balance.",
        },
        {
          q: "How long does refund take?",
          a: "Usually 1–2 hours after verification.",
        },
      ],
    },
  ];

  const filteredFaqs = faqs.map((section) => ({
    ...section,
    items: section.items.filter(
      (item) =>
        item.q.toLowerCase().includes(search.toLowerCase()) ||
        item.a.toLowerCase().includes(search.toLowerCase())
    ),
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-whitecontainer mx-auto px-2 md:px-4 py-6 md:py-10 max-w-6xl bg-gradient-to-b from-[#070c18] via-[#0b1224] to-[#05070d] text-white">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">
          Frequently Asked Questions
        </h1>

        <p className="text-slate-400 mt-3">
          Everything you need to know about top-up service
        </p>
      </div>

      {/* SEARCH */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="Search your question..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 text-white placeholder-slate-500 rounded-xl px-4 py-3
          focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:border-orange-500"
        />
      </div>

      {/* FAQ */}
      {filteredFaqs.map((section, sectionIndex) => (
        <div key={sectionIndex} className="mb-10">

          {/* CATEGORY */}
          <h2 className="text-xl font-semibold mb-5 text-orange-400">
            {section.category}
          </h2>

          <div className="space-y-3">

            {section.items.map((item, index) => {
              const currentIndex = `${sectionIndex}-${index}`;
              const isOpen = openIndex === currentIndex;

              return (
                <div
                  key={index}
                  className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-md"
                >

                  {/* QUESTION */}
                  <button
                    onClick={() =>
                      setOpenIndex(isOpen ? null : currentIndex)
                    }
                    className="w-full flex justify-between items-center px-5 py-4 text-left hover:bg-slate-800 transition"
                  >
                    <span className="font-medium text-white">
                      {item.q}
                    </span>

                    <span className="text-orange-400 text-sm">
                      {isOpen ? <FaMinus /> : <FaPlus />}
                    </span>
                  </button>

                  {/* ANSWER */}
                  {isOpen && (
                    <div className="px-5 pb-4 text-slate-400 border-t border-slate-800 leading-relaxed">
                      {item.a}
                    </div>
                  )}

                </div>
              );
            })}

          </div>
        </div>
      ))}

      {/* SUPPORT */}
      <div className="mt-16 text-center bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-lg">

        <h3 className="text-2xl font-semibold mb-2">
          Still need help?
        </h3>

        <p className="text-slate-400 mb-5">
          Our support team is available 24/7
        </p>

        <a
          href="https://wa.me/8801317956376"
          target="_blank"
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition"
        >
          <FaWhatsapp />
          Contact Support
        </a>

      </div>

    </div>
  );
}