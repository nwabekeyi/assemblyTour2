const ContactForm = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl overflow-hidden bg-white shadow-2xl rounded-3xl grid grid-cols-1 md:grid-cols-2">
        
        {/* LEFT: FORM */}
        <div className="p-8 md:p-12">
          <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-emerald-700 bg-emerald-100 rounded-full">
            Contact Us
          </span>

          <h1 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
            Let’s Talk About Your Journey
          </h1>

          <p className="mb-8 text-gray-600">
            Have questions about our Umrah or Hajj packages?  
            Send us a message and our team will get back to you shortly.
          </p>

          <form className="space-y-5">
            {/* Name & Email */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* Subject */}
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />

            {/* Message */}
            <textarea
              rows="5"
              placeholder="Write your message here..."
              className="w-full px-4 py-3 text-gray-800 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />

            {/* Button */}
            <button
              type="submit"
              className="w-full py-4 text-lg font-semibold text-white transition-all duration-300 rounded-xl bg-emerald-600 hover:bg-emerald-700 hover:shadow-lg hover:-translate-y-0.5"
            >
              Send Message
            </button>

            <p className="text-xs text-center text-gray-500">
              We respect your privacy. Your information is safe with us.
            </p>
          </form>
        </div>

        {/* RIGHT: IMAGE */}
        <div className="relative hidden md:block">
          <img
            src="assets/contact us.jpg"
            alt="Contact"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-emerald-900/30" />

          {/* Overlay Text */}
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h3 className="text-2xl font-bold">
              We’re Here to Help
            </h3>
            <p className="mt-2 text-sm text-white/90">
              Trusted travel support for your sacred journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

