import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CopyButton from "@/components/CopyButton";
import { useItemContext } from "../context/ItemContext"; // Make sure it's created

function Allvehicle() {
  const { user } = useItemContext();
  const { state } = useLocation();
  const navigate = useNavigate();
  const isUser = user?.role === "user";

  const vehicle = state?.vehicle;

  if (!vehicle) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600 font-medium">No vehicle data found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  const updateItemStatus = async (status) => {
    try {
      const res = await fetch(
        `https://backendsystem-a26n.onrender.com/vehicle/status/${vehicle._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) throw new Error("Failed to update vehicle status");

      // You may want to lift this up to context if needed
      navigate(-1);
    } catch (err) {
      console.error("Error updating vehicle status", err);
      alert("Failed to update status. Try again.");
    }
  };

  const handleApprove = () => updateItemStatus("approved");
  const handlePending = () => updateItemStatus("pending");
  const handleReject = () => updateItemStatus("rejected");

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md text-black">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Vehicle Details
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <DetailField label="Opening Date" value={vehicle.openingDate} />
        <DetailField label="Make" value={vehicle.make} />
        <DetailField label="Model" value={vehicle.model} />
        <DetailField
          label="Subcontractor Name"
          value={vehicle.subContractorName}
        />
        <DetailField label="Registration No" value={vehicle.registrationNo} />
        <DetailField label="Site Name" value={vehicle.siteName} />
        <DetailField label="Machine Category" value={vehicle.machineCategory} />
        <DetailField
          label="Created At"
          value={new Date(vehicle.createdAt).toLocaleString()}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <AttachmentField
          label=" VehiclePic"
          file={vehicle.assetPics?.vehiclePic}
        />
        <AttachmentField
          label="VehicleRcPi"
          file={vehicle.assetPics?.vehicleRcPic}
        />
        <AttachmentField
          label="Cancelled Cheque"
          file={vehicle.assetPics?.licencePic}
        />
      </div>


      <div className="flex flex-wrap justify-center gap-3 mt-8">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Back
        </button>
        <button
          onClick={handleApprove}
          disabled={isUser}
          className={`px-5 py-2 rounded text-white transition 
    ${isUser ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}
  `}
        >
          Approve
        </button>

        <button
          onClick={handlePending}
          disabled={isUser}
          className={`px-5 py-2 rounded text-white transition 
    ${isUser ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"}
  `}
        >
          Pending
        </button>

        <button
          onClick={handleReject}
          disabled={isUser}
          className={`px-5 py-2 rounded text-white transition 
    ${isUser ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}
  `}
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default Allvehicle;

// ✅ Reusable detail display component
const DetailField = ({ label, value }) => {
  return (
    <div className="bg-gray-100 p-3 rounded shadow-sm flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-base font-medium text-gray-800 break-words">
          {value}
        </p>
      </div>
      <CopyButton text={value} />
    </div>
  );
};
// const AttachmentField = ({ label, file }) => (
//   <div className="bg-gray-50 p-3 rounded shadow-sm flex flex-col items-center">
//     <span className="font-semibold mb-2">{label}</span>
//     {file ? (
//       <button
//         onClick={() =>
//           window.open(`http://localhost:5000/uploads/vehiclePics/${file}`, "_blank")
//         }
//         className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//       >
//         View
//       </button>
//     ) : (
//       <span className="text-gray-500">No File</span>
//     )}
//   </div>
// );

const AttachmentField = ({ label, file }) => {
  const fileUrl = `http://localhost:5000/uploads/vehiclePics/${file}`;
  const isPDF = file?.toLowerCase().endsWith(".pdf");

  return (
    <div className="bg-gray-50 p-3 rounded shadow-sm flex flex-col items-center">
      <span className="font-semibold mb-2">{label}</span>

      {file ? (
        <>
          {/* 👇 Preview */}
          {isPDF ? (
            <iframe
              src={fileUrl}
              title="PDF Preview"
              className="w-full h-[200px] border rounded mb-2"
            />
          ) : (
            <img
              src={fileUrl}
              alt="attachment"
              className="w-full h-[200px] object-contain rounded border mb-2"
            />
          )}

          {/* 👇 Open Full */}
          <button
            onClick={() => window.open(fileUrl, "_blank")}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Open Full
          </button>
        </>
      ) : (
        <span className="text-gray-500">No File</span>
      )}
    </div>
  );
};