// import { useItemContext } from "@/context/ItemContext";
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";

// function Vehicleall() {
//   const { user } = useItemContext();
//   const navigate = useNavigate();
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showOnlyPending, setShowOnlyPending] = useState(false);

//  useEffect(() => {
//     const socket = io("http://localhost:5000", {
//       withCredentials: true,
//     });

//     socket.on("vehicle_added", (newvehicles) => {
//       console.log("New item received via socket:", newvehicles);
//       // Update items state by adding new item at the beginning (or end)
//       setVehicles((prevvehicles) => [newvehicles, ...prevvehicles]);
//     });
//      return () => {
//       socket.disconnect();
//     };
//   }, [setVehicles]);

//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/vehicle/all", {
//           method: "GET",
//           credentials: "include",
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch vehicles");
//         }

//         const data = await response.json();
//         setVehicles(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchItems();
//   }, []);

//   const tab = (vehicle) => {
//     if (vehicle.status === "approved") {
//       alert("This vehicle is already approved.");
//       return;
//     }

//     if (user?.role !== "admin") {
//       alert("Access denied: Admins only");
//       return;
//     }

//     navigate("/allvehicle", { state: { vehicle } });
//   };

//   const sortedVehicles = [...vehicles]
//     .filter((v) => (showOnlyPending ? v.status === "pending" : true))
//     .sort((a, b) => {
//      const order = { pending: 0,rejected: 1, approved: 2,  };
//       return (order[a.status] ?? 3) - (order[b.status] ?? 3);
//     });

//   return (
//     <div className="p-1">
//       {/* <h2 className="text-2xl font-bold mb-4">All Vehicles</h2> */}

//       <div className="flex justify-end items-center mb-2">
//         <p className="text-gray-600">
//           Pending Vehicles:{" "}
//           {vehicles.filter((v) => v.status === "pending").length}
//         </p>
//         {/* <button
//           onClick={() => setShowOnlyPending((prev) => !prev)}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           {showOnlyPending ? "Show All Vehicles" : "Show Pending Only"}
//         </button> */}
//       </div>

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">Error: {error}</p>}
//       {!loading && !error && sortedVehicles.length === 0 && (
//         <p className="text-center">No vehicles found.</p>
//       )}

//       {!loading && !error && sortedVehicles.length > 0 && (
//         <table className="w-full border text-sm rounded text-center">
//           <thead className="bg-slate-800 text-white">
//             <tr>
//               <th className="p-2 border">#</th>
//               <th className="p-2 border">Opening Date</th>
//               <th className="p-2 border">Make</th>
//               <th className="p-2 border">Model</th>
//               <th className="p-2 border">Sub Contractor</th>
//               <th className="p-2 border">Reg. No</th>
//               <th className="p-2 border">Site</th>
//               <th className="p-2 border">Fleet Category</th>
//               <th className="p-2 border">Asset Pic</th>
//               <th className="p-2 border">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortedVehicles.map((vehicle, idx) => (
//               <tr
//                 key={vehicle._id}
//                 className={`text-slate-800 ${
//                   vehicle.status === "pending" ? "" : ""
//                 }`}
//               >
//                 <td className="p-2 border text-center">{idx + 1}</td>
//                 <td className="p-2 border">
//                   {vehicle.openingDate?.substring(0, 10)}
//                 </td>
//                 <td className="p-2 border">{vehicle.make}</td>
//                 <td className="p-2 border">{vehicle.model}</td>
//                 <td className="p-2 border">{vehicle.subContractorName}</td>
//                 <td className="p-2 border">{vehicle.registrationNo}</td>
//                 <td className="p-2 border">{vehicle.siteName}</td>
//                 <td className="p-2 border">{vehicle.machineCategory}</td>
//                <td className="p-2 border">
//                   {vehicle.assetPic ? (
//                     <div className="flex flex-col items-center space-y-1">
//                       {/* <img
//                         src={`http://localhost:5000/uploads/ticketPics/${ticket.attachment}`}
//                         alt="attachment"
//                         className="w-20 h-20 object-cover rounded shadow"

//                       /> */}
//                       <button
//                         onClick={() =>
//                           window.open(
//                             `http://localhost:5000/uploads/vehiclePics/${vehicle.assetPic}`,
//                             "_blank"
//                           )
//                         }
//                         className="px-2 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
//                       >
//                         View Full
//                       </button>
//                     </div>
//                   ) : (
//                     "No File"
//                   )}
//                 </td>
//                 <td className="p-2 border">
//                   <button
//                     onClick={() => tab(vehicle)}
//                     disabled={vehicle.status === "approved"}
//                     className={`px-2 py-1 rounded-full text-white ${
//                       vehicle.status === "approved"
//                         ? "bg-green-600 cursor-not-allowed"
//                         : vehicle.status === "rejected"
//                         ? "bg-red-600"
//                         : vehicle.status === "pending"
//                         ? "bg-yellow-500"
//                         : "bg-slate-800"
//                     }`}
//                   >
//                     {vehicle.status === "approved"
//                       ? "✅ Approved"
//                       : vehicle.status === "rejected"
//                       ? "❌ Rejected"
//                       : vehicle.status === "pending"
//                       ? "⏳ Pending"
//                       : "Action"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default Vehicleall;

import { useItemContext } from "@/context/ItemContext";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

function Vehicleall() {
  const { vehicles, setVehicles, user,  } =
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
        const response = await fetch("http://localhost:5000/vehicle/all", {
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
                    <button
                      onClick={() => tab(vehicle)}
                      disabled={vehicle.status === "approved"}
                      className={`px-2 py-1 text-xs sm:text-sm rounded-full text-white ${
                        vehicle.status === "approved"
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
