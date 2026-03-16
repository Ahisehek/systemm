import { useLocation, useNavigate } from "react-router-dom";
import { useItemContext } from "../context/ItemContext";
import jsPDF from "jspdf";
import { FiCopy, FiCheck } from "react-icons/fi"; // For icons
import { useState } from "react";
import CopyButton from "@/components/CopyButton";

function AllItems() {
  const { updateItemStatusInContext, items, removeItem } = useItemContext();
  const { state } = useLocation();
  const navigate = useNavigate();
  const item = state?.item;

  // const item = items.find((i) => i._id === state?.id);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Item Details", 20, 20);

    doc.setFontSize(12);
    let y = 30;

    const entries = Object.entries(item);
    entries.forEach(([key, value]) => {
      const formattedKey = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());

      doc.text(`${formattedKey}: ${value}`, 20, y);
      y += 10;
    });

    doc.save(`Item_${item.itemName || "Details"}.pdf`);
  };

  const updateItemStatus = async (status) => {
    try {
      const res = await fetch(`https://floy-hailstoned-nonelectrically.ngrok-free.dev/item/status/${item._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update status");

      updateItemStatusInContext(item._id, status);
      removeItem(item._id);
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Error updating item status");
    }
  };

  const handleApprove = () => updateItemStatus("approved");
  const handlePending = () => updateItemStatus("pending");
  const handleReject = () => updateItemStatus("rejected");

  if (!item) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600 font-medium">No item data found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md text-black">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Item Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">

        <DetailField label="Name" value={item.itemName} />
        <DetailField label="Group" value={item.itemGroup} />
        <DetailField label="GST" value={item.gst} />
        <DetailField label="HSN Code" value={item.hsnCode} />
        <DetailField label="Parts No" value={item.partsNo} />
        <DetailField label="Unit" value={item.unit} />
        <DetailField
          label="Created At"
          value={new Date(item.createdAt).toLocaleString()}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Back
        </button>
        <button
          onClick={handleApprove}
          className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Approve
        </button>
        <button
          onClick={handlePending}
          className="px-5 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Pending
        </button>
        <button
          onClick={handleReject}
          className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        >
          Reject
        </button>
        <button
          onClick={generatePDF}
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default AllItems;

// ✅ Reusable field block with Copy button
const DetailField = ({ label, value }) => {
  return (
    <div className="bg-gray-100 p-3 rounded shadow-sm flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-base font-medium text-gray-800">{value}</p>
      </div>
      <CopyButton text={value} />
    </div>
  );
};
