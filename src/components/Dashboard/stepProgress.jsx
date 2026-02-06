import React, {useRef } from "react";


const StepProgress = ({
    allSteps = [],
    completedSteps = [],
    currentStep,
    registrationStatus,
    currentStepRejectionReason,
    onStartOver,
  }) => {
    const completedMap = new Set(completedSteps.map(s => s.code));
    const currentCode = currentStep?.code || null;
    const isRejected = registrationStatus === "failed" && currentStepRejectionReason;
  
    const sortedSteps = [...allSteps].sort((a, b) => a.order - b.order);
  
    const formSectionRef = useRef(null);
  
    const handleStartOverClick = () => {
      onStartOver();
      setTimeout(() => {
        formSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    };
  
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8" ref={formSectionRef}>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Hajj Registration Journey</h3>
  
        <ul className="space-y-6 relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" aria-hidden="true" />
  
          {sortedSteps.map((step) => {
            const isCompleted = completedMap.has(step.code);
            const isCurrent = step.code === currentCode;
  
            let statusText = "Pending";
            let statusClass = "text-gray-500 bg-gray-50 border-gray-200";
            let icon = "⏳";
  
            if (isCompleted) {
              statusText = "Completed";
              statusClass = "text-emerald-700 bg-emerald-50 border-emerald-200";
              icon = "✅";
            } else if (isCurrent) {
              if (isRejected) {
                statusText = "Rejected";
                statusClass = "text-red-700 bg-red-50 border-red-300";
                icon = "❌";
              } else {
                statusText = registrationStatus === "pending" ? "Under Review" : "In Progress";
                statusClass = registrationStatus === "pending" ? "text-amber-700 bg-amber-50 border-amber-300" : "text-emerald-700 bg-emerald-50 border-emerald-300";
                icon = registrationStatus === "pending" ? "🔍" : "▶️";
              }
            }
  
            return (
              <li key={step.id} className={`p-4 rounded-lg border ${statusClass} transition-all`}>
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 ${
                      isCompleted
                        ? "bg-emerald-600 text-white"
                        : isCurrent && isRejected
                        ? "bg-red-600 text-white"
                        : isCurrent
                        ? "bg-emerald-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step.order}
                  </div>
  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-gray-900">{step.title}</h4>
                      <span className="text-sm font-medium">
                        {icon} {statusText}
                      </span>
                    </div>
  
                    {isCurrent && isRejected && currentStepRejectionReason && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800 font-medium">Reason for rejection:</p>
                        <p className="text-sm text-red-700 mt-1">{currentStepRejectionReason}</p>
  
                        <button
                          onClick={handleStartOverClick}
                          className="mt-4 px-5 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition"
                        >
                          Start Over
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

export default StepProgress