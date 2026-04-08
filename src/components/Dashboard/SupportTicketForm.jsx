import { useState } from "react";
import { toast } from "react-hot-toast";
import useDashboardStore from "../../store/dashboard.store";

function SupportTicketForm() {
  const { createTicket, fetchTickets, tickets, loading } = useDashboardStore();
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("general");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    { value: "general", label: "General Inquiry" },
    { value: "payment", label: "Payment Issue" },
    { value: "document", label: "Document Issue" },
    { value: "visa", label: "Visa Inquiry" },
    { value: "package", label: "Package/Booking" },
    { value: "technical", label: "Technical Issue" },
    { value: "other", label: "Other" },
  ];

  // Check if user has open/pending ticket
  const hasOpenTicket = tickets?.some(
    (t) => t.status === "open" || t.status === "in_progress" || t.status === "pending"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    if (hasOpenTicket) {
      toast.error("You already have an open ticket. Please wait for a response.");
      return;
    }

    setSubmitting(true);
    try {
      await createTicket({ subject, category, message });
      toast.success("Ticket submitted! We'll get back to you soon.");
      setSubject("");
      setMessage("");
      setCategory("general");
      await fetchTickets();
    } catch (err) {
      toast.error(err.message || "Failed to create ticket");
    } finally {
      setSubmitting(false);
    }
  };

  if (hasOpenTicket && tickets?.length > 0) {
    const openTicket = tickets.find(
      (t) => t.status === "open" || t.status === "in_progress" || t.status === "pending"
    );
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Your Support Ticket</h3>
        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="font-semibold text-amber-800">{openTicket?.subject}</p>
          <p className="text-sm text-amber-700 mt-1">
            Status: <span className="font-medium">{openTicket?.status}</span>
          </p>
          <p className="text-sm text-gray-600 mt-2">{openTicket?.message}</p>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          You have an open ticket. Please wait for our response before creating a new one.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Agent</h3>
      <p className="text-gray-600 mb-6">
        Have a question? Submit a support ticket and our team will get back to you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border rounded-lg bg-white"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Brief description of your issue"
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your issue in detail..."
            className="w-full p-3 border rounded-lg"
            rows={5}
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting || hasOpenTicket}
          className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Ticket"}
        </button>
      </form>
    </div>
  );
}

export default SupportTicketForm;