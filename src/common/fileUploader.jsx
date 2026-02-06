import { useDropzone } from "react-dropzone";
import React, { useCallback } from "react";

const FileUploader = ({ onFileSelect, selectedFile, label, accept = { "image/*": [] } }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) onFileSelect(acceptedFiles[0]);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept, multiple: false });

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200
          ${isDragActive ? "border-emerald-500 bg-emerald-50 scale-[1.02]" : "border-gray-300 hover:border-emerald-400"}
          ${selectedFile ? "bg-emerald-50 border-emerald-500" : "bg-white"}`}
      >
        <input {...getInputProps()} />
        {selectedFile ? (
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-2">✓</div>
            <span className="text-emerald-700 font-medium text-sm truncate max-w-full">{selectedFile.name}</span>
            <span className="text-xs text-emerald-500 mt-1">Click or drag to replace</span>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-gray-400 text-3xl">📁</div>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold text-emerald-600">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-400">JPG, PNG, or PDF (max 5MB)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;