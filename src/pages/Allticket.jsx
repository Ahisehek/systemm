import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useItemContext } from "../context/ItemContext";
import CopyButton from "@/components/CopyButton";
import { Document, Page } from 'react-pdf';

function Allticket() {
  const { updateItemStatusInContext, user } = useItemContext();
  const { state } = useLocation();
  const navigate = useNavigate();
  const isUser = user?.role === "user";
  const ticket = state?.ticket;

  if (!ticket) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600 font-medium">No ticket data found.</p>
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
      const res = await fetch(`https://backendsystem-a26n.onrender.com/ticket/status/${ticket._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update ticket status");

      updateItemStatusInContext(ticket._id, status);
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("Error updating ticket status");
    }
  };

  const handleApprove = () => updateItemStatus("approved");
  const handlePending = () => updateItemStatus("pending");
  const handleReject = () => updateItemStatus("rejected");

  const handleDownload = async () => {
    try {
      const response = await fetch(ticket.attachment);

      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;

      // 🔥 Dynamic filename (IMPORTANT)
      const fileName = ticket.attachment.split("/").pop().split("?")[0];
      a.download = fileName || "download.pdf";

      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Download failed");
    }
  };




  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md text-black">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Ticket Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <DetailField label="Site Name" value={ticket.siteName} />
        <DetailField label="Employee Name" value={ticket.employeeName} />
        <DetailField label="Contact No" value={ticket.contactNo} />
        <DetailField label="Concern Type" value={ticket.concernType} />
        <DetailField label="Description" value={ticket.description} />
        <DetailField
          label="Created At"
          value={new Date(ticket.createdAt).toLocaleString()}
        />
      </div>

      {/* <div className="mt-6">
        <p className="font-bold mb-2">Attachment:</p>
        {ticket.attachment ? (
          <button
            onClick={() =>
              window.open(
                `https://backendsystem-a26n.onrender.com/uploads/ticketPics/${ticket.attachment}`,
                "_blank"
              )
            }
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            View Attachment
          </button>
        ) : (
          <p className="text-gray-600">No File</p>
        )}
      </div> */}



      {/* <div className="mt-6">
        <p className="font-bold mb-2">Attachment:</p>

        {ticket.attachment ? (
          <>
            {ticket.attachment.includes(".pdf") ? (
              <>
              
                <embed
                  src={ticket.attachment}
                  type="application/pdf"
                  className="w-full h-[500px] border rounded"
                />


                <p className="text-sm text-gray-500 mt-2">
                  If PDF is not visible, use the button below.
                </p>
              </>
            ) : (
              <img
                src={ticket.attachment}
                alt="attachment"
                className="w-full max-h-[400px] object-contain rounded border"
              />
            )}


            <button
              onClick={() => window.open(ticket.attachment, "_blank")}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Open Full
            </button>
          </>
        ) : (
          <p className="text-gray-600">No File</p>
        )}
      </div> */}


      <div className="mt-6">
        <p className="font-bold mb-2">Attachment:</p>

        {ticket.attachment ? (
          <>
            {ticket.attachment.includes(".pdf") ? (
              <>
                {/* ✅ PDF Preview */}
                <iframe
                  src={ticket.attachment}
                  className="w-full h-[500px] border rounded"
                  title="PDF Preview"
                />

              </>
            ) : (
              <img
                src={ticket.attachment}
                alt="attachment"
                className="w-full max-h-[400px] object-contain rounded border"
              />
            )}

            <button
              onClick={handleDownload}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Download
            </button>


          </>
        ) : (
          <p className="text-gray-600">No File</p>
        )}
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

export default Allticket;

// ✅ Reusable styled detail field with copy support
const DetailField = ({ label, value }) => {
  return (
    <div className="bg-gray-100 p-3 rounded shadow-sm flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-base font-medium text-gray-800 break-words">{value}</p>
      </div>
      <CopyButton text={value} />
    </div>
  );
};
