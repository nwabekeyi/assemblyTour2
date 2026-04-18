import { motion } from "framer-motion";
import SupportTicketForm from "../components/Dashboard/SupportTicketForm";

function SupportPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Support</h2>
        <SupportTicketForm />
      </motion.div>
    </div>
  );
}

export default SupportPage;
