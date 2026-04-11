import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building, CheckCircle } from "lucide-react";
import FileUploader from "../../common/fileUploader";
import useDashboardStore from "../../store/dashboard.store";

const PaymentStepForm = ({ onSubmit, loading }) => {
  const { bankAccounts, fetchBankAccounts, registration } = useDashboardStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", "Payment Proof");
    formData.append("description", description);
    
    await onSubmit(formData);
  };

  const currentStep = registration?.current_step;
  const isPaymentStep = currentStep?.code === "payment_details" || currentStep?.code === "payment_review";
  
  const paymentApproved = registration?.completed_step_codes?.includes("payment_details");
  const paymentSubmitted = registration?.step_reviews?.some(
    r => r.step_code === "payment_details" && r.status !== "pending"
  );

  const packagePrice = registration?.package_price;

  if (!isPaymentStep) return null;

  if (paymentApproved) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100"
    >
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Payment Details</h3>
      
      {packagePrice && (
        <div className="mb-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
          <p className="text-gray-700 mb-1">Total Amount to Pay:</p>
          <p className="text-3xl font-bold text-emerald-600">₦{parseInt(packagePrice).toLocaleString()}</p>
        </div>
      )}
      
      {paymentSubmitted ? (
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <p className="text-gray-600">Payment proof uploaded. Waiting for admin approval.</p>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h4 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <FileUploader
              label="Upload Payment Proof (Bank Transfer Receipt) *"
              selectedFile={selectedFile}
              onFileSelect={setSelectedFile}
              accept={{ "image/*": [], "application/pdf": [] }}
            />
            
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
              disabled={!selectedFile || loading}
              className="w-full py-4 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700 disabled:opacity-50 transition"
            >
              {loading ? "Uploading..." : "Upload Payment Proof"}
            </button>
          </form>
        </>
      )}
    </motion.div>
  );
};

export default PaymentStepForm;