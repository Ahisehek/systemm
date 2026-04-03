

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Fleet() {
  const [fleetName, setFleetName] = useState("");
  const [fleetList, setFleetList] = useState([]);
  const [selectedFleet, setSelectedFleet] = useState(null);

  const API_URL = "https://backendsystem-a26n.onrender.com/fleet";

  useEffect(() => {
    fetchFleets();
  }, []);

  const fetchFleets = async () => {
    try {
      const res = await fetch(`${API_URL}/fleetlist`);
      const data = await res.json();
      setFleetList(data);
    } catch (err) {
      console.error("Failed to fetch fleets:", err);
    }
  };

  const handleSave = async () => {
    if (!fleetName.trim()) return;

    try {
      const res = await fetch(`${API_URL}/addfleet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fleetName.toUpperCase() }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add fleet");
        return;
      }

      setFleetList((prev) => [...prev, data.fleet]);
      setFleetName("");
    } catch (err) {
      alert("Error adding fleet");
      console.error(err);
    }
  };

  const handleDelete = async (name) => {
    try {
      const res = await fetch(`${API_URL}/delete/${encodeURIComponent(name)}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to delete fleet");
        return;
      }

      setFleetList((prev) => prev.filter((f) => f.name !== name));
    } catch (err) {
      alert("Error deleting fleet");
      console.error(err);
    }
  };


  return (
    <div className="bg-slate-200 text-white min-h-screen p-3 sm:p-4 w-full">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Add Fleet */}
        <div className="bg-white text-slate-900 rounded-xl shadow-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Add Fleet</h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={fleetName}
              onChange={(e) => setFleetName(e.target.value.toUpperCase())}
              placeholder="Enter Fleet Name"
              className="flex-1 border border-slate-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-slate-500"
            />

            <button
              onClick={handleSave}
              className="w-full sm:w-auto bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-900 transition"
            >
              Save
            </button>
          </div>

          {selectedFleet && (
            <div className="mt-4 text-sm text-slate-700">
              Selected Fleet:{" "}
              <span className="font-semibold">{selectedFleet.name}</span>
            </div>
          )}
        </div>

        {/* Fleet List */}
        <div className="bg-white text-slate-900 rounded-xl shadow-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl text-center mb-4">Fleet List</h2>

          {fleetList.length === 0 ? (
            <p className="text-center text-slate-500">No fleets added.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[400px] w-full border-collapse">

                <thead className="bg-slate-800 text-white">
                  <tr>
                    <th className="px-3 py-2">Fleet Name</th>
                    <th className="px-2 py-2 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {[...fleetList]
                    .sort((a, b) => {
                      const startsWithInput = (name) =>
                        name?.toLowerCase().startsWith(fleetName.toLowerCase());

                      if (startsWithInput(a.name) && !startsWithInput(b.name)) return -1;
                      if (!startsWithInput(a.name) && startsWithInput(b.name)) return 1;
                      return 0;
                    })
                    .map((fleet, index) => {
                      const isMatch =
                        fleet.name.toLowerCase().startsWith(fleetName.toLowerCase()) &&
                        fleetName !== "";

                      return (
                        <tr
                          key={index}
                          className={`${isMatch ? "bg-yellow-100" : "hover:bg-slate-100"
                            } cursor-pointer transition`}
                          onClick={() => setSelectedFleet(fleet)}
                        >
                          <td className="px-3 py-2 border-b">
                            {fleet.name.toUpperCase()}
                          </td>

                          <td className="text-center border-b">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!window.confirm("Delete this fleet?")) return;
                                handleDelete(fleet.name);
                              }}
                              className="text-red-600 hover:text-red-800 text-lg"
                              title="Delete"
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>

              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );

  // return (
  //   <div className="bg-slate-800 text-white p-2 ">
  //     <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 h-100 overflow-hidden">
  //       {/* Add Fleet Card */}
  //       <div className="bg-white text-slate-900 rounded-lg shadow-lg p-6">
  //         <h2 className="text-2xl font-bold mb-4 text-slate-800">Add Fleet</h2>
  //         <div className="flex flex-col gap-4">
  //           <input
  //             type="text"
  //             value={fleetName}
  //             onChange={(e) => setFleetName(e.target.value.toUpperCase())}
  //             placeholder="Enter Fleet Name"
  //             className="border border-slate-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-slate-500"
  //           />
  //           <button
  //             onClick={handleSave}
  //             className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-900 transition"
  //           >
  //             Save Fleet
  //           </button>
  //         </div>
  //         {selectedFleet && (
  //           <div className="mt-4 text-sm text-slate-700">
  //             Selected Fleet:{" "}
  //             <span className="font-semibold text-slate-900">
  //               {selectedFleet.name}
  //             </span>
  //           </div>
  //         )}
  //       </div>

  //       {/* Fleet List Card */}
  //       <div className="bg-white text-slate-900 rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto">
  //         <h2 className="text-2xl font-bold mb-4 text-slate-800 text-center">
  //           Fleet List
  //         </h2>
  //         {fleetList.length === 0 ? (
  //           <p className="text-center text-slate-500">No fleets added.</p>
  //         ) : (
  //           <table className="w-full text-left border-collapse">
  //             <thead className="bg-slate-800 text-white">
  //               <tr>
  //                 <th className="px-4 py-2">Fleet Name</th>
  //                 <th className="px-2 py-2 text-center">Action</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {[...fleetList]
  //                 .sort((a, b) => {
  //                   const startsWithInput = (name) =>
  //                     name?.toLowerCase().startsWith(fleetName.toLowerCase());

  //                   if (startsWithInput(a.name) && !startsWithInput(b.name)) return -1;
  //                   if (!startsWithInput(a.name) && startsWithInput(b.name)) return 1;
  //                   return 0;
  //                 })
  //                 .map((fleet, index) => {
  //                   const isMatch =
  //                     fleet.name.toLowerCase().startsWith(fleetName.toLowerCase()) &&
  //                     fleetName !== "";

  //                   return (
  //                     <tr
  //                       key={index}
  //                       className={`${isMatch ? "bg-yellow-100" : "hover:bg-slate-100"
  //                         } cursor-pointer transition`}
  //                       onClick={() => setSelectedFleet(fleet)}
  //                     >
  //                       <td className="px-4 py-2 border-b border-slate-200">
  //                         {fleet.name.toUpperCase()}
  //                       </td>
  //                       <td className="text-center border-b border-slate-200">
  //                         <button
  //                           onClick={(e) => {
  //                             e.stopPropagation();
  //                             handleDelete(fleet.name);
  //                           }}
  //                           className="text-red-600 hover:text-red-800 transition"
  //                           title="Delete"
  //                         >
  //                           <FontAwesomeIcon icon={faTrashCan} />
  //                         </button>
  //                       </td>
  //                     </tr>
  //                   );
  //                 })}
  //             </tbody>
  //           </table>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default Fleet;
