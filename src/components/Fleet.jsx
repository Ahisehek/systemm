// import React from "react";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrashCan } from '@fortawesome/free-solid-svg-icons'; // for solid version


// function Fleet() {
//   const [fleetName, setFleetName] = useState("");
//   const [fleetList, setFleetList] = useState([]);
//   const [selectedFleet, setSelectedFleet] = useState("");






  
//    const API_URL = "http://localhost:5000/fleet";

//   // Fetch fleets on component mount
//   useEffect(() => {
//     fetchFleets();
//   }, []);

//   const fetchFleets = async () => {
//     try {
//       const res = await fetch(`${API_URL}/fleetlist`);
//       const data = await res.json();
//       setFleetList(data);
//     } catch (err) {
//       console.error("Failed to fetch fleets:", err);
//     }
//   };

//   const handleSave = async () => {
//     if (!fleetName.trim()) return;

//     try {
//       const res = await fetch(`${API_URL}/addfleet`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: fleetName }),
//         credentials: "include", 
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Failed to add fleet");
//         return;
//       }

//       setFleetList((prev) => [...prev, data.fleet]);
//       setFleetName("");
//     } catch (err) {
//       alert("Error adding fleet");
//       console.error(err);
//     }
//   };

//   const handleDelete = async (name) => {
//     try {
//       const res = await fetch(`${API_URL}/delete/${encodeURIComponent(name)}`, {
//         method: "DELETE",
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Failed to delete fleet");
//         return;
//       }

//       setFleetList((prev) => prev.filter((b) => b.name !== name));
//     } catch (err) {
//       alert("Error deleting fleet");
//       console.error(err);
//     }
//   };
  

  
//   return (
//     <>
//       <div className="font-serif ">
//         <div className=" flex gap-1 justify-center p-2">
//           <div className="bg-white w-100 h-95  flex justify-center items-center flex-col gap-2  rounded">
//             <div className="   justify-center text-black">This is fleet</div>
//             <div className=" justify-center  ">
//               <label htmlFor="" className="text-slate-700">Fleet:</label>
//               <input
//                 type="text"
//                 placeholder="enter the fleet"
//                 value={fleetName}
//                 onChange={(e) => setFleetName(e.target.value)}
//                 className="px-1 border border-slate-300  outline-none rounded bg-white text-black"
//               />
//             </div>
//             <div className="btn">
//               <Button
//                 variant="outline"
//                 className="hover:bg-blue-900 bg-blue-800 text-white active:bg-black"
//                 onClick={handleSave}
//               >
//                 save
//               </Button>
//             </div>
//             <div>
//               {selectedFleet && (
//                 <div className="m-4 text-black ">
//                   Selected Fleet: {selectedFleet}
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="">
//             <div className="bg-slate-600 h-95 w-70  rounded overflow-auto hide-scrollbar  pl-2 ">
//               <h2 className="   text-center">Fleet</h2>
//               {fleetList.length === 0 ? (
//                 <p className="text-center text-gray-600 ">
//                   No fleet names added.
//                 </p>
//               ) : (
//                 <table className="border-collapse  px-2 cursor-pointer ">
//                   <thead>
//                     <tr>
//                       {/* <th className="border border-white ">#</th> */}
//                       {/* <th className="border border-white ">Fleet Name</th> */}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {[...fleetList]
//                       .sort((a, b) => {
//                         const startsWithInput = (name) =>
//                           name?.toString().toLowerCase().startsWith(fleetName.toLowerCase());

//                         // Move matches to the top
//                         if (startsWithInput(a) && !startsWithInput(b))
//                           return -1;
//                         if (!startsWithInput(a) && startsWithInput(b)) return 1;
//                         return 0; // Preserve original order otherwise
//                       })
//                       .map((fleet, index) => {
//                         const isMatch =
//                           fleet.name.toLowerCase()

//                             .startsWith(fleetName.toLowerCase()) &&
//                           fleetName !== "";

//                         return (
//                           <tr
//                             key={index}
//                             className={
//                               isMatch ? "bg-black cursor-pointer  " : ""
//                             }
//                             onClick={() => setSelectedFleet(fleet)}
//                           >
//                             {/* <td className="border-b p-2">{index + 1}</td> */}
//                             <td className="border border-white w-60 text-center   font-serif">
//                               {fleet.name}
//                             </td>
//                             <td className="text-center">
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation(); // Prevent triggering row click
//                                   handleDelete(fleet.name);
//                                 }}
//                                 className=" text-white   rounded hover:bg-red-800"
//                               >
//                               <FontAwesomeIcon icon={faTrashCan} />

//                               </button>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                   </tbody>
//                 </table>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Fleet;


import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Fleet() {
  const [fleetName, setFleetName] = useState("");
  const [fleetList, setFleetList] = useState([]);
  const [selectedFleet, setSelectedFleet] = useState(null);

  const API_URL = "http://localhost:5000/fleet";

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
        body: JSON.stringify({ name: fleetName }),
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
    <div className="bg-slate-800 text-white p-2 ">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 h-100 overflow-hidden">
        {/* Add Fleet Card */}
        <div className="bg-white text-slate-900 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Add Fleet</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={fleetName.toUpperCase()}
              onChange={(e) => setFleetName(e.target.value)}
              placeholder="Enter Fleet Name"
              className="border border-slate-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-slate-500"
            />
            <button
              onClick={handleSave}
              className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-900 transition"
            >
              Save Fleet
            </button>
          </div>
          {selectedFleet && (
            <div className="mt-4 text-sm text-slate-700">
              Selected Fleet:{" "}
              <span className="font-semibold text-slate-900">
                {selectedFleet.name}
              </span>
            </div>
          )}
        </div>

        {/* Fleet List Card */}
        <div className="bg-white text-slate-900 rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 text-slate-800 text-center">
            Fleet List
          </h2>
          {fleetList.length === 0 ? (
            <p className="text-center text-slate-500">No fleets added.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-4 py-2">Fleet Name</th>
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
                        className={`${
                          isMatch ? "bg-yellow-100" : "hover:bg-slate-100"
                        } cursor-pointer transition`}
                        onClick={() => setSelectedFleet(fleet)}
                      >
                        <td className="px-4 py-2 border-b border-slate-200">
                          {fleet.name}
                        </td>
                        <td className="text-center border-b border-slate-200">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(fleet.name);
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

export default Fleet;
