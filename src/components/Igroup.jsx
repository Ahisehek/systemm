// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

// function Igroup() {
//   const [igroupName, setIgroupName] = useState("");
//   const [igroupList, setIgroupList] = useState([]);
//   const [selectedIgroup, setSelectedIgroup] = useState("");

//   const API_URL = "http://localhost:5000/igroup";

//   // Fetch igroups on mount
//   useEffect(() => {
//     const fetchIgroups = async () => {
//       try {
//         const res = await fetch(`${API_URL}/list`);
//         const data = await res.json();
//         setIgroupList(data);
//       } catch (err) {
//         console.error("Failed to fetch igroups:", err);
//       }
//     };
//     fetchIgroups();
//   }, []);

//   const handleSave = async () => {
//     if (!igroupName.trim()) return;
//     try {
//       const res = await fetch(`${API_URL}/add`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: igroupName }),
//         credentials: "include",
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         alert(data.message || "Failed to add igroup");
//         return;
//       }
//       setIgroupList(prev => [...prev, data.igroup]);
//       setIgroupName("");
//     } catch (err) {
//       alert("Error adding igroup");
//       console.error(err);
//     }
//   };

//   const handleDelete = async (name) => {
//     try {
//       const res = await fetch(`${API_URL}/delete/${encodeURIComponent(name)}`, {
//         method: "DELETE",
//          credentials:"include",
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         alert(data.message || "Failed to delete igroup");
//         return;
//       }
//       setIgroupList(prev => prev.filter(b => b.name !== name));
//     } catch (err) {
//       alert("Error deleting igroup");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="font-serif">
//       <div className="flex gap-1 justify-center p-2">
//         {/* Left Panel */}
//         <div className="bg-white w-100 h-95 flex justify-center items-center flex-col gap-2 rounded">
//           <div className="text-black">This is igroup</div>
//           <div>
//             <label className="text-slate-700">Igroup:</label>
//             <input
//               type="text"
//               placeholder="enter the igroup"
//               value={igroupName}
//               onChange={e => setIgroupName(e.target.value)}
//               className="px-1 border border-slate-300 outline-none rounded bg-white text-black"
//             />
//           </div>
//           <div className="btn">
//             <Button
//               variant="outline"
//               className="hover:bg-blue-900 bg-blue-800 text-white active:bg-black"
//               onClick={handleSave}
//             >
//               save
//             </Button>
//           </div>
//           <div>
//             {selectedIgroup && (
//               <div className="m-4 text-black">
//                 Selected Igroup: {selectedIgroup}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Right Panel */}
//         <div>
//           <div className="bg-slate-600 h-95 w-70 rounded overflow-auto hide-scrollbar pl-2">
//             <h2 className="text-center text-white">Igroup</h2>
//             {igroupList.length === 0 ? (
//               <p className="text-center text-gray-600">
//                 No igroup names added.
//               </p>
//             ) : (
//               <table className="border-collapse px-2 cursor-pointer w-full">
//                 <tbody>
//                   {[...igroupList]
//                     .sort((a, b) => {
//                       const aMatch = a.name.toLowerCase().startsWith(igroupName.toLowerCase());
//                       const bMatch = b.name.toLowerCase().startsWith(igroupName.toLowerCase());
//                       if (aMatch && !bMatch) return -1;
//                       if (!aMatch && bMatch) return 1;
//                       return 0;
//                     })
//                     .map((igroup, idx) => {
//                       const isMatch =
//                         igroup.name.toLowerCase().startsWith(igroupName.toLowerCase()) &&
//                         igroupName !== "";

//                       return (
//                         <tr
//                           key={idx}
//                           className={isMatch ? "bg-black cursor-pointer" : ""}
//                           onClick={() => setSelectedIgroup(igroup.name)}
//                         >
//                           <td className="border border-white w-60 text-center font-serif">
//                             {igroup.name}
//                           </td>
//                           <td className="text-center">
//                             <button
//                               onClick={e => {
//                                 e.stopPropagation();
//                                 handleDelete(igroup.name);
//                               }}
//                               className="text-white rounded hover:bg-red-800 p-1"
//                             >
//                               <FontAwesomeIcon icon={faTrashCan} />
//                             </button>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Igroup;



import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Igroup() {
  const [igroupName, setIgroupName] = useState("");
  const [igroupList, setIgroupList] = useState([]);
  const [selectedIgroup, setSelectedIgroup] = useState(null);

  const API_URL = "http://localhost:5000/igroup";

  useEffect(() => {
    fetchIgroups();
  }, []);

  const fetchIgroups = async () => {
    try {
      const res = await fetch(`${API_URL}/list`);
      const data = await res.json();
      setIgroupList(data);
    } catch (err) {
      console.error("Failed to fetch igroups:", err);
    }
  };

  const handleSave = async () => {
    if (!igroupName.trim()) return;
    try {
      const res = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: igroupName }),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to add igroup");
        return;
      }

      setIgroupList((prev) => [...prev, data.igroup]);
      setIgroupName("");
    } catch (err) {
      alert("Error adding igroup");
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
        alert(data.message || "Failed to delete igroup");
        return;
      }

      setIgroupList((prev) => prev.filter((item) => item.name !== name));
    } catch (err) {
      alert("Error deleting igroup");
      console.error(err);
    }
  };

  return (
    <div className="bg-slate-800 text-white p-2">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 h-100 overflow-hidden">
        {/* Add Igroup Card */}
        <div className="bg-white text-slate-900 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Add Igroup</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={igroupName.toUpperCase()}
              onChange={(e) => setIgroupName(e.target.value)}
              placeholder="Enter Igroup Name"
              className="border border-slate-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-slate-500"
            />
            <button
              onClick={handleSave}
              className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-900 transition"
            >
              Save Igroup
            </button>
          </div>
          {selectedIgroup && (
            <div className="mt-4 text-sm text-slate-700">
              Selected Igroup:{" "}
              <span className="font-semibold text-slate-900">
                {selectedIgroup}
              </span>
            </div>
          )}
        </div>

        {/* Igroup List Card */}
        <div className="bg-white text-slate-900 rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 text-slate-800 text-center">
            Igroup List
          </h2>
          {igroupList.length === 0 ? (
            <p className="text-center text-slate-500">No igroups added.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-4 py-2">Igroup Name</th>
                  <th className="px-2 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...igroupList]
                  .sort((a, b) => {
                    const startsWithInput = (name) =>
                      name?.toLowerCase().startsWith(igroupName.toLowerCase());

                    if (startsWithInput(a.name) && !startsWithInput(b.name)) return -1;
                    if (!startsWithInput(a.name) && startsWithInput(b.name)) return 1;
                    return 0;
                  })
                  .map((igroup, index) => {
                    const isMatch =
                      igroup.name.toLowerCase().startsWith(igroupName.toLowerCase()) &&
                      igroupName !== "";

                    return (
                      <tr
                        key={index}
                        className={`${
                          isMatch ? "bg-yellow-100" : "hover:bg-slate-100"
                        } cursor-pointer transition`}
                        onClick={() => setSelectedIgroup(igroup.name)}
                      >
                        <td className="px-4 py-2 border-b border-slate-200">
                          {igroup.name}
                        </td>
                        <td className="text-center border-b border-slate-200">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(igroup.name);
                            }}
                            className="text-red-600 hover:text-red-800 transition"
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
          )}
        </div>
      </div>
    </div>
  );
}

export default Igroup;
