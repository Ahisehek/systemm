import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="text-blue-600 hover:text-blue-800 transition p-1"
      title="Copy to clipboard"
    >
      {copied ? <FiCheck className="w-5 h-5" /> : <FiCopy className="w-5 h-5" />}
    </button>
  );
};

export default CopyButton;
