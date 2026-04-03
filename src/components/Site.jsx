



import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Repo() {
  const [fullName, setFullName] = useState("");
  const [sortName, setSortName] = useState("");
  const [sites, setSites] = useState([]);

  const API_URL = "https://backendsystem-a26n.onrender.com/site";

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const res = await fetch(`${API_URL}/allsite`);
        const data = await res.json();
        setSites(data);
      } catch (err) {
        console.error("Failed to fetch sites:", err);
      }
    };

    fetchSites();
  }, []);

  // Reorder sites if there's a match
  useEffect(() => {
    const trimmed = fullName.trim().toLowerCase();
    if (!trimmed) return;

    const index = sites.findIndex((site) =>
      site.fullName.toLowerCase().startsWith(trimmed)
    );

    if (index > 0) {
      const updated = [...sites];
      const [matched] = updated.splice(index, 1);
      setSites([matched, ...updated]);
    }
  }, [fullName]);

  const handleSave = async () => {
    const trimmedFullName = fullName.trim();
    const trimmedSortName = sortName.trim();

    if (!trimmedFullName || !trimmedSortName) {
      alert("Both Full Name and Sort Name are required.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/addsite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: trimmedFullName,
          sortName: trimmedSortName,
        }),
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || "Failed to save site.");
        return;
      }

      setSites([result, ...sites]);
      setFullName("");
      setSortName("");
    } catch (err) {
      console.error(err);
      alert("Error saving site");
    }
  };

  const handleDelete = async (siteId) => {
    try {
      const response = await fetch(`${API_URL}/${siteId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        alert("Failed to delete");
        return;
      }

      setSites((prev) => prev.filter((site) => site._id !== siteId));
    } catch (err) {
      console.error(err);
      alert("Error deleting site");
    }
  };

  const truncateText = (text, maxLength = 18) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="bg-slate-200 text-white min-h-screen p-3 sm:p-4 w-full">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">

        <div className="bg-white text-black p-4 sm:p-6 rounded-xl">
          <h2 className="text-xl sm:text-2xl mb-4">Add Site</h2>

          <div className="flex flex-col gap-3">
            <input value={fullName} placeholder="site name" onChange={(e) => setFullName(e.target.value)} className="border p-2 rounded" />
            <input value={sortName} placeholder="state name" onChange={(e) => setSortName(e.target.value)} className="border p-2 rounded" />
            <button onClick={handleSave} className="bg-slate-800 text-white py-2 rounded">Save</button>
          </div>
        </div>

        <div className="bg-white text-slate-900 rounded-xl shadow-lg p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-slate-800 text-center">
            site List
          </h2>

          {sites.length === 0 ? (
            <p className="text-center text-slate-500">No banks added.</p>
          ) : (

            <div className="overflow-x-auto">
              <table className="min-w-[400px] w-full border-collapse">

                <thead className="bg-slate text-white text-sm sm:text-base">
                  <tr>
                    <th className="p-2">Sort</th>
                    <th className="p-2">Full Name</th>
                    <th className="p-2 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {sites.map((s) => {
                    const isMatch =
                      fullName.trim() &&
                      s.fullName.toLowerCase().startsWith(fullName.toLowerCase());

                    return (
                      <tr
                        key={s._id}
                        className={`${isMatch ? "bg-yellow-100" : "hover:bg-gray-100"
                          } transition`}
                      >
                        <td className="p-2 border text-center">
                          {s.sortName}
                        </td>

                        <td className="p-2 border break-words">
                          {truncateText(s.fullName)}
                        </td>

                        <td className="p-2 border text-center">
                          <button
                            onClick={() => handleDelete(s._id)}
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
  //   <div className=" bg-slate-800 text-white p-2">
  //     <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 h-100 overflow-hidden">
  //       {/* Form Card */}
  //       <div className="bg-white text-slate-900 rounded-lg shadow-lg p-6">
  //         <h2 className="text-2xl font-bold mb-4 text-slate-800">Add Site</h2>

  //         <div className="flex flex-col gap-4">
  //           <div>
  //             <label className="block mb-1 text-sm">Full Name:</label>
  //             <input
  //               type="text"
  //               value={fullName}
  //               onChange={(e) => setFullName(e.target.value)}
  //               placeholder="Enter full site name"
  //               className="w-full border border-slate-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-slate-500"
  //             />
  //           </div>

  //           <div>
  //             <label className="block mb-1 text-sm">Sort Name:state</label>
  //             <input
  //               type="text"
  //               value={sortName}
  //               maxLength={4}
  //               onChange={(e) => setSortName(e.target.value)}
  //               placeholder="State"
  //               className="w-full border border-slate-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-slate-500"
  //             />
  //           </div>

  //           <button
  //             onClick={handleSave}
  //             className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-900 transition"
  //           >
  //             Save Site
  //           </button>
  //         </div>
  //       </div>

  //       {/* Site List Card */}
  //       <div className="bg-white text-slate-900 rounded-lg shadow-lg p-6 overflow-auto max-h-[80vh]">
  //         <h2 className="text-2xl font-bold mb-4 text-slate-800 text-center">
  //           Site List
  //         </h2>

  //         {sites.length === 0 ? (
  //           <p className="text-center text-slate-500">No sites added.</p>
  //         ) : (
  //           <table className="w-full table-auto border-collapse">
  //             <thead className="bg-slate-800 text-white">
  //               <tr>
  //                 <th className="px-4 py-2">Sort</th>
  //                 <th className="px-4 py-2">Full Name</th>
  //                 <th className="px-4 py-2 text-center">Action</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {sites.map((site, index) => {
  //                 const isMatch =
  //                   fullName.trim() &&
  //                   site.fullName.toLowerCase().startsWith(fullName.toLowerCase());

  //                 return (
  //                   <tr
  //                     key={index}
  //                     className={`${isMatch ? "bg-yellow-100" : "hover:bg-slate-100"
  //                       } transition cursor-pointer`}
  //                   >
  //                     <td className="border-b px-4 py-2 text-center">
  //                       {site.sortName}
  //                     </td>
  //                     <td className="border-b px-4 py-2">{truncateText(site.fullName)}</td>
  //                     <td className="border-b px-4 py-2 text-center">
  //                       <button
  //                         onClick={() => handleDelete(site._id)}
  //                         className="text-red-600 hover:text-red-800 transition"
  //                         title="Delete"
  //                       >
  //                         <FontAwesomeIcon icon={faTrashCan} />
  //                       </button>
  //                     </td>
  //                   </tr>
  //                 );
  //               })}
  //             </tbody>
  //           </table>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default Repo;
