export default function AboutPage() {
  return (
    <div className="container mx-auto px-2 md:px-4 py-6 md:py-10 max-w-6xl bg-gradient-to-b from-[#070c18] via-[#0b1224] to-[#05070d] text-white">

      {/* HERO */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">
          About Our Platform
        </h1>

        <p className="text-slate-400 text-lg mt-3">
          Fast, Secure & Reliable Free Fire Diamond Top-Up Service
        </p>
      </div>

      {/* INTRO */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl mb-8 shadow-md">
        <p className="text-slate-300 leading-relaxed">
          We are a trusted online platform providing instant Free Fire diamond top-up services.
          Our goal is to deliver fast, secure, and hassle-free gaming currency to players
          across Bangladesh and beyond. We ensure smooth transactions with reliable support
          and instant delivery in most cases.
        </p>
      </div>

      {/* MISSION + VISION */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-md hover:border-pink-500/30 transition">
          <h2 className="text-xl font-semibold mb-3 text-pink-400">
            Our Mission
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Our mission is to provide gamers with a fast, safe, and affordable way
            to purchase Free Fire diamonds without any complexity or risk.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-md hover:border-orange-500/30 transition">
          <h2 className="text-xl font-semibold mb-3 text-orange-400">
            Our Vision
          </h2>
          <p className="text-slate-400 leading-relaxed">
            We aim to become one of the most trusted gaming top-up platforms,
            ensuring smooth service and customer satisfaction for every user.
          </p>
        </div>

      </div>

      {/* WHY CHOOSE US */}
      <div className="mb-10">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md hover:scale-[1.02] transition">
            <h3 className="font-semibold mb-2 text-white">
              ⚡ Instant Delivery
            </h3>
            <p className="text-slate-400 text-sm">
              Most orders are processed instantly within minutes.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md hover:scale-[1.02] transition">
            <h3 className="font-semibold mb-2 text-white">
              🔒 Secure Payment
            </h3>
            <p className="text-slate-400 text-sm">
              We support trusted local payment methods like bKash & Nagad.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-md hover:scale-[1.02] transition">
            <h3 className="font-semibold mb-2 text-white">
              💬 24/7 Support
            </h3>
            <p className="text-slate-400 text-sm">
              Our support team is always ready to assist you anytime.
            </p>
          </div>

        </div>
      </div>

      {/* TRUST NOTE */}
      <div className="bg-slate-900 border border-red-500/20 p-6 rounded-2xl text-center shadow-md">

        <h3 className="text-lg font-semibold text-red-400 mb-2">
          Important Notice
        </h3>

        <p className="text-slate-400 text-sm leading-relaxed">
          We never ask for your Free Fire password or sensitive account details.
          Always provide only your Player ID during top-up.
        </p>

      </div>

    </div>
  );
}