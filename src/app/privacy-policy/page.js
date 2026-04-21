export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-2 md:px-4 py-6 md:py-10 max-w-6xl bg-gradient-to-b from-[#070c18] via-[#0b1224] to-[#05070d] text-white">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">
          Privacy Policy
        </h1>
        <p className="text-gray-500">
          Your privacy is important to us
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8 text-gray-700 leading-relaxed">

        <section className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
          <p>
            We only collect necessary information required to process your order, such as Player ID,
            transaction details, and basic contact information. We do not collect sensitive personal data.
          </p>
        </section>

        <section className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
          <p>
            Your information is used only for processing Free Fire diamond top-up orders,
            providing customer support, and improving our service quality.
          </p>
        </section>

        <section className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">3. Data Protection</h2>
          <p>
            We take proper security measures to protect your data. Your information is stored securely
            and is never sold, shared, or misused for any third-party marketing.
          </p>
        </section>

        <section className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">4. Payment Information</h2>
          <p>
            We do not store your payment credentials. All payments are processed through secure
            third-party payment gateways like bKash, Nagad, or Rocket.
          </p>
        </section>

        <section className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">5. Cookies</h2>
          <p>
            We may use cookies to improve user experience and website functionality.
            You can disable cookies from your browser settings if you prefer.
          </p>
        </section>

        <section className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">6. Third-Party Services</h2>
          <p>
            We may use third-party services for payment processing and analytics.
            These services have their own privacy policies.
          </p>
        </section>

        <section className="bg-gray-50 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">7. Account Safety</h2>
          <p>
            We never ask for your Free Fire password or login credentials.
            Always keep your account information secure.
          </p>
        </section>

        <section className="bg-red-50 border border-red-200 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-2 text-red-600">
            Important Notice
          </h2>
          <p>
            By using our website, you agree to this Privacy Policy.
            We may update this policy anytime without prior notice.
          </p>
        </section>

      </div>

      {/* Footer note */}
      <div className="text-center mt-10 text-sm text-gray-500">
        © {new Date().getFullYear()} All rights reserved.
      </div>

    </div>
  );
}