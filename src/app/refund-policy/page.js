export default function RefundPolicyPage() {
  return (
  <div className="container mx-auto px-2 md:px-4 py-6 md:py-10 max-w-6xl bg-gradient-to-b from-[#070c18] via-[#0b1224] to-[#05070d] text-white">

    {/* Glow Background */}
    <div className="absolute w-[400px] h-[400px] bg-pink-500/10 blur-3xl rounded-full top-[-120px] right-[-120px]" />
    <div className="absolute w-[400px] h-[400px] bg-violet-500/10 blur-3xl rounded-full bottom-[-120px] left-[-120px]" />

    <div className="relative max-w-5xl mx-auto">

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
          Refund Policy
        </h1>
        <p className="text-gray-400 mt-3">
          Please read our refund terms carefully before placing an order
        </p>
      </div>

      {/* Content */}
      <div className="space-y-6">

        {/* Card */}
        {[
          {
            title: "1. General Policy",
            content: "Refunds are only applicable under specific conditions mentioned below. By placing an order, you agree to our refund policy."
          },
          {
            title: "2. Eligible Refund Cases",
            content: (
              <ul className="list-disc pl-5 mt-2 text-gray-300 space-y-1">
                <li>The order fails to deliver successfully</li>
                <li>Technical issue from our system prevents processing</li>
                <li>Payment received but service not delivered</li>
              </ul>
            )
          },
          {
            title: "3. Important Refund Rule",
            content: "All approved refunds will be credited to your in-app wallet only. No cash refund is available."
          },
          {
            title: "4. Refund Processing Time",
            content: "Refunds are usually processed within 1–2 working hours after verification. In rare cases, it may take up to 24 hours."
          },
          {
            title: "5. Non-Refundable Cases",
            content: (
              <ul className="list-disc pl-5 mt-2 text-gray-300 space-y-1">
                <li>Wrong Player ID provided by customer</li>
                <li>Completed and successfully delivered orders</li>
                <li>Game server delay issues</li>
              </ul>
            )
          },
          {
            title: "6. Fraud Protection",
            content: "Fraudulent refund requests may lead to account restriction or permanent ban."
          }
        ].map((item, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl border backdrop-blur-xl transition
              ${i === 2
                ? "bg-red-500/10 border-red-500/30"
                : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
          >
            <h2 className={`text-lg font-semibold mb-2
              ${i === 2 ? "text-red-300" : "text-white"}
            `}>
              {item.title}
            </h2>

            <div className="text-gray-300 text-sm leading-relaxed">
              {item.content}
            </div>
          </div>
        ))}

      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-gray-500 text-sm">
        © {new Date().getFullYear()} All rights reserved.
      </div>

    </div>
  </div>
);
}