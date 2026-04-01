

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Bank() {
  const [bankName, setBankName] = useState("");
  const [bankList, setBankList] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);

  const API_URL = "https://backendsystem-a26n.onrender.com/api";

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const res = await fetch(`${API_URL}/list`);
      const data = await res.json();
      setBankList(data);
    } catch (err) {
      console.error("Failed to fetch banks:", err);
    }
  };

  const handleSave = async () => {
    if (!bankName.trim()) return;

    try {
      const res = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: bankName.toUpperCase() }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to add bank");
        return;
      }

      setBankList((prev) => [...prev, data.bank]);
      setBankName("");
    } catch (err) {
      alert("Error adding bank");
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
        alert(data.message || "Failed to delete bank");
        return;
      }

      setBankList((prev) => prev.filter((b) => b.name !== name));
    } catch (err) {
      alert("Error deleting bank");
      console.error(err);
    }
  };

  return (
    <div className="bg-slate-800 text-white min-h-screen p-3 sm:p-4">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Add Bank Card */}
        <div className="bg-white text-slate-900 rounded-xl shadow-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-slate-800">
            Add Bank
          </h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value.toUpperCase())}
              placeholder="Enter bank name"
              className="flex-1 border border-slate-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-slate-500"
            />

            <button
              onClick={handleSave}
              className="w-full sm:w-auto bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-900 transition"
            >
              Save
            </button>
          </div>

          {selectedBank && (
            <div className="mt-4 text-sm text-slate-700 break-words">
              Selected Bank:{" "}
              <span className="font-semibold text-slate-900">
                {selectedBank.name}
              </span>
            </div>
          )}
        </div>

        {/* Bank List Card */}
        <div className="bg-white text-slate-900 rounded-xl shadow-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-slate-800 text-center">
            Bank List
          </h2>

          {bankList.length === 0 ? (
            <p className="text-center text-slate-500">No banks added.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-[400px] w-full text-left border-collapse">
                <thead className="bg-slate-800 text-white text-sm sm:text-base">
                  <tr>
                    <th className="px-3 sm:px-4 py-2">Bank Name</th>
                    <th className="px-2 py-2 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {[...bankList]
                    .sort((a, b) => {
                      const startsWithInput = (name) =>
                        name?.toLowerCase().startsWith(bankName.toLowerCase());

                      if (startsWithInput(a.name) && !startsWithInput(b.name)) return -1;
                      if (!startsWithInput(a.name) && startsWithInput(b.name)) return 1;
                      return 0;
                    })
                    .map((bank, index) => {
                      const isMatch =
                        bank.name.toLowerCase().startsWith(bankName.toLowerCase()) &&
                        bankName !== "";

                      return (
                        <tr
                          key={index}
                          className={`${isMatch ? "bg-yellow-100" : "hover:bg-slate-100"
                            } cursor-pointer transition`}
                          onClick={() => setSelectedBank(bank)}
                        >
                          <td className="px-3 sm:px-4 py-2 border-b border-slate-200 text-sm sm:text-base break-words">
                            {bank.name.toUpperCase()}
                          </td>

                          <td className="text-center border-b border-slate-200">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(bank.name);
                              }}
                              className="text-red-600 hover:text-red-800 transition text-lg"
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
  //   <div className=" bg-slate-800 text-white p-2">
  //     <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 h-100">
  //       {/* Add Bank Card */}
  //       <div className="bg-white text-slate-900 rounded-lg shadow-lg p-6">
  //         <h2 className="text-2xl font-bold mb-4 text-slate-800">Add Bank</h2>

  //         <div className="flex flex-col gap-4">
  //           <input
  //             type="text"
  //             value={bankName}
  //             onChange={(e) => setBankName(e.target.value.toUpperCase())}
  //             placeholder="Enter bank name"
  //             className="border border-slate-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-slate-500"
  //           />
  //           <button
  //             onClick={handleSave}
  //             className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-900 transition"
  //           >
  //             Save Bank
  //           </button>
  //         </div>

  //         {selectedBank && (
  //           <div className="mt-4 text-sm text-slate-700">
  //             Selected Bank:{" "}
  //             <span className="font-semibold text-slate-900">
  //               {selectedBank.name}
  //             </span>
  //           </div>
  //         )}
  //       </div>

  //       {/* Bank List Card */}
  //       <div className="bg-white text-slate-900 rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto">
  //         <h2 className="text-2xl font-bold mb-4 text-slate-800 text-center">Bank List</h2>

  //         {bankList.length === 0 ? (
  //           <p className="text-center text-slate-500">No banks added.</p>
  //         ) : (
  //           <table className="w-full text-left border-collapse">
  //             <thead className="bg-slate-800 text-white">
  //               <tr>
  //                 <th className="px-4 py-2">Bank Name</th>
  //                 <th className="px-2 py-2 text-center">Action</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {[...bankList]
  //                 .sort((a, b) => {
  //                   const startsWithInput = (name) =>
  //                     name?.toLowerCase().startsWith(bankName.toLowerCase());

  //                   if (startsWithInput(a.name) && !startsWithInput(b.name)) return -1;
  //                   if (!startsWithInput(a.name) && startsWithInput(b.name)) return 1;
  //                   return 0;
  //                 })
  //                 .map((bank, index) => {
  //                   const isMatch =
  //                     bank.name.toLowerCase().startsWith(bankName.toLowerCase()) &&
  //                     bankName !== "";

  //                   return (
  //                     <tr
  //                       key={index}
  //                       className={`${isMatch ? "bg-yellow-100" : "hover:bg-slate-100"
  //                         } cursor-pointer transition`}
  //                       onClick={() => setSelectedBank(bank)}
  //                     >
  //                       <td className="px-4 py-2 border-b border-slate-200">
  //                         {bank.name.toUpperCase()}
  //                       </td>
  //                       <td className="text-center border-b border-slate-200">
  //                         <button
  //                           onClick={(e) => {
  //                             e.stopPropagation();
  //                             handleDelete(bank.name);
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

export default Bank;
