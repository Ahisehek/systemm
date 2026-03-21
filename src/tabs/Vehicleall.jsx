

import { useItemContext } from "@/context/ItemContext";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

function Vehicleall() {
  const { vehicles, setVehicles, user, loadingUser } =
    useItemContext();
  const navigate = useNavigate();
  //const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOnlyPending, setShowOnlyPending] = useState(false);

  // useEffect(() => {
  //   const socket = io("http://localhost:5000", {
  //     withCredentials: true,
  //   });

  //   socket.on("vehicle_added", (newVehicle) => {
  //     console.log("New vehicle received via socket:", newVehicle);
  //     setVehicles((prev) => [newVehicle, ...prev]);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("https://backendsystem-a26n.onrender.com/vehicle/all", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch vehicles");

        const data = await response.json();
        setVehicles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const tab = (vehicle) => {
    if (vehicle.status === "approved") {
      alert("This vehicle is already approved.");
      return;
    }

    if (user?.role !== "admin") {
      navigate("/dashbord/notauthorized");
      return;
    }

    navigate("/allvehicle", { state: { vehicle } });
  };

  const sortedVehicles = [...vehicles]
    .filter((v) => (showOnlyPending ? v.status === "pending" : true))
    .sort((a, b) => {
      const order = { pending: 0, rejected: 1, approved: 2 };
      return (order[a.status] ?? 3) - (order[b.status] ?? 3);
    });

  return (
    <div className="p-2 sm:p-4">


      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <p className="text-gray-600 text-sm sm:text-base">
          Pending Vehicles:{" "}
          <span className="font-semibold">
            {vehicles.filter((v) => v.status === "pending").length}
          </span>
        </p>
        <p className="text-gray-600 text-sm sm:text-base">
          Total Items: <span className="font-semibold">{vehicles.length}</span>
        </p>
        {/* Toggle Button - Optional */}
        {/* <button
          onClick={() => setShowOnlyPending((prev) => !prev)}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showOnlyPending ? "Show All Vehicles" : "Show Pending Only"}
        </button> */}
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}
      {!loading && !error && sortedVehicles.length === 0 && (
        <p className="text-center text-gray-500">No vehicles found.</p>
      )}

      {!loading && !error && sortedVehicles.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-xs sm:text-sm text-center">
            <thead className="bg-slate-800 text-white">
              <tr>
                {/* <th className="p-1 border whitespace-nowrap">#</th> */}
                {/* <th className="p-1 border whitespace-nowrap">Opening Date</th> */}
                <th className="p-1 border whitespace-nowrap">Make</th>
                <th className="p-1 border whitespace-nowrap">Model</th>
                <th className="p-1 border whitespace-nowrap">Sub Contractor</th>
                <th className="p-1 border whitespace-nowrap">Reg. No</th>
                <th className="p-1 border whitespace-nowrap">Site</th>
                <th className="p-1 border whitespace-nowrap">Fleet Category</th>
                {/* <th className="p-1 border whitespace-nowrap">Asset Pic</th> */}
                <th className="p-1 border whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedVehicles.map((vehicle, idx) => (
                <tr key={vehicle._id} className="text-slate-800 ">
                  {/* <td className="p-1 border">{idx + 1}</td> */}
                  {/* <td className="p-1 border">
                    {vehicle.openingDate?.substring(0, 10)}
                  </td> */}
                  <td className="p-1 border whitespace-nowrap">
                    {vehicle.make}
                  </td>
                  <td className="p-1 border whitespace-nowrap">
                    {vehicle.model}
                  </td>
                  <td className="p-1 border whitespace-nowrap">
                    {vehicle.subContractorName}
                  </td>
                  <td className="p-1 border whitespace-nowrap">
                    {vehicle.registrationNo}
                  </td>
                  <td className="p-1 border whitespace-nowrap">
                    {vehicle.siteName}
                  </td>
                  <td className="p-1 border whitespace-nowrap">
                    {vehicle.machineCategory}
                  </td>
                  {/* <td className="p-1 border whitespace-nowrap">
                    {vehicle.assetPic ? (
                      <div className="flex flex-col items-center space-y-1">
                        <button
                          onClick={() =>
                            window.open(
                              `http://localhost:5000/uploads/vehiclePics/${vehicle.assetPic}`,
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
                    {/* <button
                      onClick={() => tab(vehicle)}
                      disabled={
                        vehicle.status === "approved" ||
                        loadingUser ||
                        user?.role !== "admin"
                      }
                      className={`px-2 py-1 text-xs sm:text-sm rounded-full text-white ${vehicle.status === "approved"
                        ? "bg-green-600 cursor-not-allowed"
                        : vehicle.status === "rejected"
                          ? "bg-red-600"
                          : vehicle.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-slate-800"
                        }`}
                    >
                      {vehicle.status === "approved"
                        ? "✅ Approved"
                        : vehicle.status === "rejected"
                          ? "❌ Rejected"
                          : vehicle.status === "pending"
                            ? "⏳ Pending"
                            : "Action"}
                    </button> */}

                    <button
                      onClick={() => tab(vehicle)}
                      // disabled={
                      //   vehicle.status === "approved" ||
                      //   loadingUser ||
                      //   user?.role !== "admin"
                      // }
                      className={`px-2 py-1 text-xs sm:text-sm rounded-full text-white transition-colors ${vehicle.status === "approved"
                        ? "bg-green-600 cursor-not-allowed"
                        // : user?.role !== "admin"
                        //   ? "bg-gray-400 cursor-not-allowed"
                        : vehicle.status === "rejected"
                          ? "bg-red-600"
                          : vehicle.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-slate-800"
                        }`}
                    >
                      {vehicle.status === "approved"
                        ? "✅ Approved"
                        // : user?.role !== "admin"
                        //   ? "🔒 No Access"
                        : vehicle.status === "rejected"
                          ? "❌ Rejected"
                          : vehicle.status === "pending"
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

export default Vehicleall;
