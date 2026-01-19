
const ContactForm = () => {
  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col justify-center items-center">
      <h1 className="my-3 mb-8 text-3xl font-bold text-gray-800 animate-fade-in-up">
        Get In Touch
      </h1>
      <div className="flex flex-wrap w-full max-w-5xl overflow-hidden transition duration-500 transform bg-white rounded-lg shadow-lg hover:scale-105">
        {/* Contact Form Section */}
        <div className="w-full p-8 space-y-6 bg-gray-100 md:w-1/2">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Contact Us
          </h2>
          <form className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="flex-1 min-w-[calc(50%-0.5rem)] px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <input
                type="email"
                placeholder="Email"
                className="flex-1 min-w-[calc(50%-0.5rem)] px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-3 transition border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Message"
              className="w-full h-32 px-4 py-3 transition border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <button className="w-full px-4 py-3 text-white transition bg-blue-600 rounded-md hover:bg-blue-700 hover:shadow-lg">
              Send Message
            </button>
          </form>
        </div>

        {/* Map/Contact Image Section */}
        <div className="w-full overflow-hidden md:w-1/2">
          <img
            src={`assets/contact us.jpg`}
            alt="Map"
            className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
