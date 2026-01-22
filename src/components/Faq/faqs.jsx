import { useState } from "react";

const faqs = [
  {
    question: "How do I book an Umrah or Hajj package?",
    answer:
      "Booking is easy and secure. Browse our packages, select your preferred dates and group size, provide traveler details, and complete the payment. You will receive a confirmation email with your itinerary, visa instructions, and preparation guidelines.",
  },
  {
    question: "What is included in the package price?",
    answer:
      "Our packages typically include round-trip flights, visa processing, accommodation in Makkah and Madinah (near the Haram), air-conditioned transport, all required transfers, ziyarah tours, and guidance from experienced scholars. Meals vary by package – full details are provided on each package page.",
  },
  {
    question: "Can I customize my Umrah or Hajj itinerary?",
    answer:
      "Yes! We specialize in tailored journeys. You can extend your stay in Madinah, upgrade hotels, add extra ziyarah sites, or combine Umrah with visits to other blessed locations. Contact our team for a fully personalized pilgrimage plan.",
  },
  {
    question: "What is your cancellation and refund policy?",
    answer:
      "We understand plans can change. Cancellations made 45+ days before departure qualify for a full refund (minus visa fees). Between 30–45 days, a partial refund applies. Closer to departure, refunds depend on airline and hotel policies. Hajj has stricter terms due to Saudi regulations.",
  },
  {
    question: "Do you provide Hajj permits and visa assistance?",
    answer:
      "Absolutely. We are a licensed agency and handle the entire official process, including Nusuk registration, Hajj permits, and Saudi e-visa applications. Our dedicated team ensures all requirements are met so you can focus on your spiritual preparation.",
  },
];

function FaqItem({ question, answer, isActive, onToggle }) {
  return (
    <div className="border-b border-gray-200 py-2">
      <button
        onClick={onToggle}
        className="w-full py-4 text-lg font-medium text-left text-gray-800 focus:outline-none hover:text-emerald-600 transition-colors"
      >
        <div className="flex justify-between items-center">
          <span>{question}</span>
          <span className="text-2xl">{isActive ? "−" : "+"}</span>
        </div>
      </button>
      {isActive && <p className="pb-6 text-gray-600 leading-relaxed">{answer}</p>}
    </div>
  );
}

function Faq({faqs}) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know before embarking on your sacred Umrah or Hajj journey.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isActive={activeIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Faq;