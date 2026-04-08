import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building, Upload, CheckCircle, AlertCircle } from "lucide-react";
import useDashboardStore from "../../store/dashboard.store";

const PaymentStepForm = ({ onSubmit, loading }) => {
  const { bankAccounts, fetchBankAccounts, registration } = useDashboardStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    
    setUploading(true);
    
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", "Payment Proof");
    formData.append("description", description);
    
    try {
      await onSubmit(formData);
    } finally {
      setUploading(false);
    }
  };

  const currentStep = registration?.current_step;
  const isPaymentStep = currentStep?.code === "payment_details" || currentStep?.code === "payment_review";
  
  // Check if payment already submitted
  const paymentSubmitted = registration?.step_reviews?.some(
    r => r.step_code === "payment_details" && r.status !== "pending"
  );

  if (!isPaymentStep) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Details</h3>
      
      {paymentSubmitted ? (
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <p className="text-gray-600">Payment proof uploaded. Waiting for admin approval.</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Building className="w-5 h-5" />
              Bank Accounts for Payment
            </h4>
            {bankAccounts.length > 0 ? (
              <div className="grid gap-3">
                {bankAccounts.map((account) => (
                  <div key={account.id} className="p-4 bg-gray-50 rounded-lg border">
                    <p className="font-semibold text-gray-800">{account.bank_name}</p>
                    <p className="text-gray-600">{account.account_name}</p>
                    <p className="text-gray-800 font-mono">{account.account_number}</p>
                    {account.notes && (
                      <p className="text-sm text-gray-500 mt-1">{account.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No bank accounts available. Please contact support.</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Payment Proof (Bank Transfer Receipt)
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add any notes about your payment..."
                className="w-full p-3 border rounded-lg"
                rows={3}
              />
            </div>

            <button
              type="submit"
              disabled={!selectedFile || uploading}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg font-medium hover:bg-emerald-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {uploading ? (
                "Uploading..."
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Upload Payment Proof
                </>
              )}
            </button>
          </form>
        </>
      )}
    </motion.div>
  );
};

export default PaymentStepForm;