import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CopyButton from "@/components/CopyButton"; // ⬅️ Ensure this is available
import { useItemContext } from "../context/ItemContext";

function Allvendor() {
  const { updateItemStatusInContext } = useItemContext();
  const { state } = useLocation();
  const navigate = useNavigate();

  const vendor = state?.vendor;
  const onStatusUpdate = state?.onStatusUpdate;

  if (!vendor) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600 font-medium">No vendor data found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  const updateItemStatus = async (status) => {
    try {
      const res = await fetch(
        `https://floy-hailstoned-nonelectrically.ngrok-free.dev/vender/status/${vendor._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) throw new Error("Failed to update vendor status");

      if (typeof onStatusUpdate === "function") {
        onStatusUpdate(vendor._id, status);
      }

      navigate(-1);
    } catch (err) {
      console.error("Error updating vendor status", err);
      alert("Failed to update status. Try again.");
    }
  };

  const handleApprove = () => updateItemStatus("approved");
  const handlePending = () => updateItemStatus("pending");
  const handleReject = () => updateItemStatus("rejected");

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow text-black">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Vendor Details</h2>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <DetailField label="Account Name" value={vendor.accountName} />
        <DetailField label="Full Address" value={vendor.fullAddress} />
        <DetailField label="City" value={vendor.city} />
        <DetailField label="Contact Person Name" value={vendor.contactpersonName} />
        <DetailField label="Contact Person No" value={vendor.contactpersonNo} />
        <DetailField label="Email ID" value={vendor.emailId} />
        <DetailField label="Bank Name" value={vendor.bankName} />
        <DetailField label="Bank Account No" value={vendor.bankAccountNo} />
        <DetailField label="IFSC Code" value={vendor.ifscCode} />
        <DetailField label="PAN No" value={vendor.panNo} />
        <DetailField label="GST No" value={vendor.gstNo} />
        <DetailField label="MSME No" value={vendor.msmeNo} />
        <DetailField label="Account Group" value={vendor.accountGroup} />
        <DetailField label="GST State" value={vendor.gstState} />
        <DetailField label="TDS" value={vendor.tds} />
        {/* <DetailField label="Verify IFSC" value={vendor.verifyIfsc} />
        <DetailField label="Verify GST" value={vendor.verifyGst} /> */}
        {/* <DetailField label="ITR Declaration" value={vendor.itrDeclaration} /> */}
        <DetailField label="MSME Type" value={vendor.msmeType} />
        <DetailField
          label="Created At"
          value={new Date(vendor.createdAt).toLocaleString()}
        />
        {/* <DetailField label="Major Activity" value={vendor.majorActivity} /> */}
      </div>

      {/* Attachments Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <AttachmentField label="GST Certificate" file={vendor.attachments?.gstCertificate} />
        <AttachmentField label="PAN Card" file={vendor.attachments?.panCard} />
        <AttachmentField label="Cancelled Cheque" file={vendor.attachments?.cancelledCheque} />
        <AttachmentField label="MSME" file={vendor.attachments?.msme} />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Back
        </button>
        <button
          onClick={handleApprove}
          className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Approve
        </button>
        <button
          onClick={handlePending}
          className="px-5 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Pending
        </button>
        <button
          onClick={handleReject}
          className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default Allvendor;

// ✅ Reusable field with copy button
const DetailField = ({ label, value }) => (
  <div className="bg-gray-100 p-3 rounded shadow-sm flex justify-between items-start">
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-base font-medium text-gray-800 break-words">{value || "—"}</p>
    </div>
    <CopyButton text={value} />
  </div>
);

// ✅ Reusable attachment field
const AttachmentField = ({ label, file }) => (
  <div className="bg-gray-50 p-3 rounded shadow-sm flex flex-col items-center">
    <span className="font-semibold mb-2">{label}</span>
    {file ? (
      <button
        onClick={() =>
          window.open(`http://localhost:5000/uploads/vendorPics/${file}`, "_blank")
        }
        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        View
      </button>
    ) : (
      <span className="text-gray-500">No File</span>
    )}
  </div>
);
