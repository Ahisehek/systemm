

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";



function Gst() {
  const [gstName, setGstName] = useState("");
  const [gstList, setGstList] = useState([]);


  const API_URL = "https://backendsystem-a26n.onrender.com/gst";

  useEffect(() => {
    fetchGsts();
  }, []);

  const fetchGsts = async () => {
    try {
      const res = await fetch(`${API_URL}/gstlist`);
      const data = await res.json();
      setGstList(data);
    } catch (err) {
      console.error("Failed to fetch gsts:", err);
    }
  };

  const handleSave = async () => {
    if (!gstName.trim()) return;

    try {
      const res = await fetch(`${API_URL}/addgst`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: gstName }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add gst");
        return;
      }

      setGstList((prev) => [...prev, data.gst]);
      setGstName("");
    } catch (err) {
      alert("Error adding gst");
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
        alert(data.message || "Failed to delete gst");
        return;
      }

      setGstList((prev) => prev.filter((g) => g.name !== name));
    } catch (err) {
      alert("Error deleting gst");
      console.error(err);
    }
  };

  return (
    <div className="bg-slate-800 text-white min-h-screen ">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Add GST */}
        <div className="bg-white text-slate-900 rounded-xl shadow-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Add GST</h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={gstName}
              onChange={(e) => setGstName(e.target.value.toUpperCase())}
              placeholder="Enter GST name"
              className="flex-1 border px-3 py-2 rounded focus:ring-2"
            />

            <button
              onClick={handleSave}
              className="w-full sm:w-auto bg-slate-800 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </div>

        {/* GST List */}
        <div className="bg-white text-slate-900 rounded-xl shadow-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl text-center mb-4">GST List</h2>

          <div className="overflow-x-auto">
            <table className="min-w-[400px] w-full">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="p-2">GST Name</th>
                  <th className="p-2 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {gstList.map((gst, i) => (
                  <tr key={i} className="hover:bg-gray-100">
                    <td className="p-2 border">{gst.name}</td>
                    <td className="text-center border">
                      <button
                        onClick={() => handleDelete(gst.name)}
                        className="text-red-600"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </div>
  );


  // return (
  //   <div className="bg-slate-800 text-white p-2 ">
  //     <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 h-100 overflow-hidden">
  //       {/* Add Gst Card */}
  //       <div className="bg-white text-slate-900 rounded-lg shadow-lg p-6">
  //         <h2 className="text-2xl font-bold mb-4 text-slate-800">Add GST</h2>
  //         <div className="flex flex-col gap-4">
  //           <input
  //             type="text"
  //             value={gstName.toUpperCase()}
  //             onChange={(e) => setGstName(e.target.value)}
  //             placeholder="Enter GST name"
  //             className="border border-slate-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-slate-500"
  //           />
  //           <button
  //             onClick={handleSave}
  //             className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-900 transition"
  //           >
  //             Save GST
  //           </button>
  //         </div>
  //         {selectedGst && (
  //           <div className="mt-4 text-sm text-slate-700">
  //             Selected GST:{" "}
  //             <span className="font-semibold text-slate-900">
  //               {selectedGst.name}
  //             </span>
  //           </div>
  //         )}
  //       </div>

  //       {/* Gst List Card */}
  //       <div className="bg-white text-slate-900 rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto">
  //         <h2 className="text-2xl font-bold mb-4 text-slate-800 text-center">
  //           GST List
  //         </h2>
  //         {gstList.length === 0 ? (
  //           <p className="text-center text-slate-500">No GSTs added.</p>
  //         ) : (
  //           <table className="w-full text-left border-collapse">
  //             <thead className="bg-slate-800 text-white">
  //               <tr>
  //                 <th className="px-4 py-2">GST Name</th>
  //                 <th className="px-2 py-2 text-center">Action</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {[...gstList]
  //                 .sort((a, b) => {
  //                   const startsWithInput = (name) =>
  //                     name?.toLowerCase().startsWith(gstName.toLowerCase());

  //                   if (startsWithInput(a.name) && !startsWithInput(b.name)) return -1;
  //                   if (!startsWithInput(a.name) && startsWithInput(b.name)) return 1;
  //                   return 0;
  //                 })
  //                 .map((gst, index) => {
  //                   const isMatch =
  //                     gst.name.toLowerCase().startsWith(gstName.toLowerCase()) &&
  //                     gstName !== "";

  //                   return (
  //                     <tr
  //                       key={index}
  //                       className={`${isMatch ? "bg-yellow-100" : "hover:bg-slate-100"
  //                         } cursor-pointer transition`}
  //                       onClick={() => setSelectedGst(gst)}
  //                     >
  //                       <td className="px-4 py-2 border-b border-slate-200">
  //                         {gst.name}
  //                       </td>
  //                       <td className="text-center border-b border-slate-200">
  //                         <button
  //                           onClick={(e) => {
  //                             e.stopPropagation();
  //                             handleDelete(gst.name);
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

export default Gst;
