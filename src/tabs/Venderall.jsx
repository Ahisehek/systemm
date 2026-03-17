// import { useItemContext } from "../context/ItemContext";
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";

// function Venderall() {
//   const { user } = useItemContext();
//   const [vendorStatuses, setVendorStatuses] = useState({});
//   const [vendors, setVendors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showOnlyPending, setShowOnlyPending] = useState(false);
//   const navigate = useNavigate();

// useEffect(() => {
//   const socket = io("http://localhost:5000", { withCredentials: true });

//   socket.on("vendor_added", (newVendor) => {
//     console.log("New vendor received via socket:", newVendor);
//     setVendors((prev) => [newVendor, ...prev]);
//   });

//   return () => socket.disconnect();
// }, []);

//   useEffect(() => {
//     const fetchVendors = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/vender/all", {
//           method: "GET",
//           credentials: "include",
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch vendors");
//         }

//         const data = await response.json();
//         setVendors(data);

//         const initialStatuses = {};
//         data.forEach((vendor) => {
//           initialStatuses[vendor._id] = vendor.status || "Action";
//         });
//         setVendorStatuses(initialStatuses);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVendors();
//   }, []);

//   const tab = (vendor) => {

//     if (user?.role !== "admin") {
//       alert("Access denied: Admins only");
//       return;
//     }
//   if (vendor.status === "approved") {
//       alert("This vendor has already been approved. Status cannot be changed.");
//       return;
//     }
//     navigate("/allvenders", { state: { vendor } });
//   };

//   const sortedVendors = [...vendors]
//     .filter((v) => (showOnlyPending ? v.status === "pending" : true))
//     .sort((a, b) => {
//       const order = { pending: 0,rejected: 1, approved: 2,  };
//       return (order[a.status] ?? 3) - (order[b.status] ?? 3);
//     });

//   return (
//     <div className="p-1">
//       {/* <h2 className="text-2xl font-bold mb-4">Vendor List</h2> */}

//       <div className="flex justify-end items-center mb-2">
//         <p className="text-gray-600">
//           Pending Vendors: {vendors.filter((v) => v.status === "pending").length}
//         </p>
//         {/* <button
//           onClick={() => setShowOnlyPending((prev) => !prev)}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           {showOnlyPending ? "Show All Vendors" : "Show Pending Only"}
//         </button> */}
//       </div>

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">Error: {error}</p>}
//       {!loading && !error && sortedVendors.length === 0 && (
//         <p className="text-center">No vendor found.</p>
//       )}

//       {!loading && !error && sortedVendors.length > 0 && (
//         <table className="w-full border text-sm rounded text-center">
//           <thead className="bg-slate-800 text-white">
//             <tr>
//               <th className="p-2 border">Name</th>
//               <th className="p-2 border">Site</th>
//               <th className="p-2 border">Email</th>
//               <th className="p-2 border">GST No</th>
//               <th className="p-2 border">PAN</th>
//               <th className="p-2 border">Bank</th>
//               <th className="p-2 border">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortedVendors.map((vendor, idx) => (
//               <tr
//                 key={idx}
//                 className={`h-9 text-slate-800 ${
//                   vendor.status === "pending" ? "" : ""
//                 }`}
//               >
//                 <td className="p-2 border">{vendor.accountName}</td>
//                 <td className="p-2 border">{vendor.siteName}</td>
//                 <td className="p-2 border">{vendor.emailId}</td>
//                 <td className="p-2 border">{vendor.gstNo}</td>
//                 <td className="p-2 border">{vendor.panNo}</td>
//                 <td className="p-2 border">{vendor.bankName}</td>
//                 <td className="p-2 border">
//                   <button
//                     onClick={() => tab(vendor)}
//                     disabled={vendor.status === "approved"}
//                     className={`px-2 py-1 rounded-full text-white ${
//                       vendor.status === "approved"
//                         ? "bg-green-600 cursor-not-allowed"
//                         : vendor.status === "rejected"
//                         ? "bg-red-600"
//                         : vendor.status === "pending"
//                         ? "bg-yellow-500"
//                         : "bg-slate-800"
//                     }`}
//                   >
//                     {vendor.status === "approved"
//                       ? "✅ Approved"
//                       : vendor.status === "rejected"
//                       ? "❌ Rejected"
//                       : vendor.status === "pending"
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

// export default Venderall;

import { useItemContext } from "../context/ItemContext";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

function Venderall() {
  const { vendors, setVendors, user, } =
    useItemContext();
  const [vendorStatuses, setVendorStatuses] = useState({});
  // const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showOnlyPending, setShowOnlyPending] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const socket = io("http://localhost:5000", { withCredentials: true });

  //   socket.on("vendor_added", (newVendor) => {
  //     console.log("New vendor received via socket:", newVendor);
  //     setVendors((prev) => [newVendor, ...prev]);
  //   });

  //   return () => socket.disconnect();
  // }, []);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch("https://backendsystem-a26n.onrender.com/vender/all", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch vendors");

        const data = await response.json();
        setVendors(data);

        const initialStatuses = {};
        data.forEach((vendor) => {
          initialStatuses[vendor._id] = vendor.status || "Action";
        });
        setVendorStatuses(initialStatuses);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const tab = (vendor) => {
    if (user?.role !== "admin") {
      navigate("/dashbord/notauthorized");
      return;
    }

    if (vendor.status === "approved") {
      alert(" already been approved. Status cannot be changed.");
      return;
    }

    navigate("/allvenders", { state: { vendor } });
  };

  const sortedVendors = [...vendors]
    .filter((v) => (showOnlyPending ? v.status === "pending" : true))
    .sort((a, b) => {
      const order = { pending: 0, rejected: 1, approved: 2 };
      return (order[a.status] ?? 3) - (order[b.status] ?? 3);
    });

  return (
    <div className="p-2 sm:p-4">


      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <p className="text-gray-600 text-sm sm:text-base">
          Pending Vendors:{" "}
          <span className="font-semibold">
            {vendors.filter((v) => v.status === "pending").length}
          </span>
        </p>
        <p className="text-gray-600 text-sm sm:text-base">
          Total Items: <span className="font-semibold">{vendors.length}</span>
        </p>
        {/* Toggle button (optional) */}
        {/* <button
          onClick={() => setShowOnlyPending((prev) => !prev)}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showOnlyPending ? "Show All Vendors" : "Show Pending Only"}
        </button> */}
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}
      {!loading && !error && sortedVendors.length === 0 && (
        <p className="text-center text-gray-500">No vendor found.</p>
      )}

      {!loading && !error && sortedVendors.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-xs sm:text-sm text-center">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="p-1 border whitespace-nowrap">Name</th>
                <th className="p-1 border whitespace-nowrap">Site</th>
                <th className="p-1 border whitespace-nowrap">Email</th>
                <th className="p-1 border whitespace-nowrap">GST No</th>
                <th className="p-1 border whitespace-nowrap">PAN</th>
                <th className="p-1 border whitespace-nowrap">Bank</th>
                <th className="p-1 border whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedVendors.map((vendor, idx) => (
                <tr key={idx} className=" text-slate-800">
                  <td className="p-1 border whitespace-nowrap">
                    {vendor.accountName}
                  </td>
                  <td className="p-1 border whitespace-nowrap">
                    {vendor.siteName}
                  </td>
                  <td className="p-1 border whitespace-nowrap">
                    {vendor.emailId}
                  </td>
                  <td className="p-1 border whitespace-nowrap">
                    {vendor.gstNo}
                  </td>
                  <td className="p-1 border whitespace-nowrap">
                    {vendor.panNo}
                  </td>
                  <td className="p-1 border whitespace-nowrap">
                    {vendor.bankName}
                  </td>
                  <td className="p-1 border">
                    <button
                      onClick={() => tab(vendor)}
                      disabled={vendor.status === "approved"}
                      className={`px-2 py-1 text-xs sm:text-sm rounded-full text-white ${vendor.status === "approved"
                        ? "bg-green-600 cursor-not-allowed"
                        : vendor.status === "rejected"
                          ? "bg-red-600"
                          : vendor.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-slate-800"
                        }`}
                    >
                      {vendor.status === "approved"
                        ? "✅ Approved"
                        : vendor.status === "rejected"
                          ? "❌ Rejected"
                          : vendor.status === "pending"
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

export default Venderall;
