

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useItemContext } from "@/context/ItemContext";
import { io } from "socket.io-client";

function Ticketall() {
  const { tickets, setTickets, user, } =
    useItemContext();
  const navigate = useNavigate();
  //const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOnlyPending, setShowOnlyPending] = useState(false);

  // useEffect(() => {
  //   const socket = io("http://localhost:5000", {
  //     withCredentials: true,
  //   });

  //   socket.on("ticket_added", (newTicket) => {
  //     console.log("New ticket received via socket:", newTicket);
  //     setTickets((prevTickets) => [newTicket, ...prevTickets]);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch("https://backendsystem-a26n.onrender.com/ticket/all", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }

        const data = await response.json();
        setTickets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const tab = (ticket) => {
    if (ticket.status === "approved") {
      alert("This ticket has already been approved.");
      return;
    }

    if (user?.role !== "admin") {
      navigate("/dashbord/notauthorized");
      return;
    }

    navigate("/allticket", { state: { ticket } });
  };

  const sortedTickets = [...tickets]
    .filter((ticket) => (showOnlyPending ? ticket.status === "pending" : true))
    .sort((a, b) => {
      const order = { pending: 0, rejected: 1, approved: 2 };
      return (order[a.status] ?? 3) - (order[b.status] ?? 3);
    });

  return (
    <div className="p-2 sm:p-4">


      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <p className="text-gray-600 text-sm sm:text-base">
          Pending Tickets:{" "}
          <span className="font-semibold">
            {tickets.filter((t) => t.status === "pending").length}
          </span>
        </p>
        <p className="text-gray-600 text-sm sm:text-base">
          Total Items: <span className="font-semibold">{tickets.length}</span>
        </p>
        {/* Optional Toggle Button */}
        {/* <button
          onClick={() => setShowOnlyPending((prev) => !prev)}
          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
        >
          {showOnlyPending ? "Show All Tickets" : "Show Pending Only"}
        </button> */}
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}
      {!loading && !error && sortedTickets.length === 0 && (
        <p className="text-center text-gray-500">No tickets found.</p>
      )}

      {!loading && !error && sortedTickets.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-xs sm:text-sm text-center">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="p-1 border whitespace-nowrap">Site</th>
                <th className="p-1 border whitespace-nowrap">Employee Name</th>
                <th className="p-1 border whitespace-nowrap">Contact No</th>
                <th className="p-1 border whitespace-nowrap">Concern Type</th>
                <th className="p-1 border whitespace-nowrap">Description</th>
                {/* <th className="p-1 border whitespace-nowrap">Attachment</th> */}
                <th className="p-1 border whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedTickets.map((ticket, idx) => (
                <tr key={ticket._id} className="text-slate-800">
                  <td className="p-1 border">{ticket.siteName}</td>
                  <td className="p-1 border whitespace-nowrap">
                    {ticket.employeeName}
                  </td>
                  <td className="p-1 border whitespace-nowrap">
                    {ticket.contactNo}
                  </td>
                  <td className="p-1 border whitespace-nowrap">
                    {ticket.concernType}
                  </td>
                  <td className="p-1 border">{ticket.description}</td>

                  {/* <td className="p-1 border whitespace-nowrap">
                    {ticket.attachment ? (
                      <div className="flex flex-col items-center space-y-1">
                        <button
                          onClick={() =>
                            window.open(
                              `http://localhost:5000/uploads/ticketPics/${ticket.attachment}`,
                              "_blank"
                            )
                          }
                          className="px-2 py-1 text-xs sm:text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          View Full
                        </button>
                      </div>
                    ) : (
                      "No File"
                    )}
                  </td> */}
                  <td className="p-1 border whitespace-nowrap">
                    <button
                      onClick={() => tab(ticket)}
                      disabled={ticket.status === "approved"}
                      className={`px-2 py-1 rounded-full text-white text-xs sm:text-sm ${ticket.status === "approved"
                        ? "bg-green-600 cursor-not-allowed"
                        : ticket.status === "rejected"
                          ? "bg-red-600"
                          : ticket.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-slate-800"
                        }`}
                    >
                      {ticket.status === "approved"
                        ? "✅ Approved"
                        : ticket.status === "rejected"
                          ? "❌ Rejected"
                          : ticket.status === "pending"
                            ? "⏳ Pending"
                            : "Action"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Ticketall;
