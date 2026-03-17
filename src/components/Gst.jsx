// import React from "react";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrashCan } from '@fortawesome/free-solid-svg-icons'; // for solid version


// function Gst() {
//   const [gstName, setGstName] = useState("");
//   const [gstList, setGstList] = useState([]);
//   const [selectedGst, setSelectedGst] = useState("");






//   const API_URL = "http://localhost:5000/gst";

//   // Fetch gsts on component mount
//   useEffect(() => {
//     fetchGsts();
//   }, []);

//   const fetchGsts = async () => {
//     try {
//       const res = await fetch(`${API_URL}/gstlist`);
//       const data = await res.json();
//       setGstList(data);
//     } catch (err) {
//       console.error("Failed to fetch gsts:", err);
//     }
//   };

//   const handleSave = async () => {
//     if (!gstName.trim()) return;

//     try {
//       const res = await fetch(`${API_URL}/addgst`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: gstName }),
//         credentials: "include", 
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || "Failed to add gst");
//         return;
//       }

//       setGstList((prev) => [...prev, data.gst]);
//       setGstName("");
//     } catch (err) {
//       alert("Error adding gst");
//       console.error(err);
//     }
//   };

//   const handleDelete = async (name) => {
//     try {
//       const res = await fetch(`${API_URL}/delete/${encodeURIComponent(name)}`, {
//         method: "DELETE",
//       });

//       const data = await res.json();
//       console.log(data); 

//       if (!res.ok) {
//         alert(data.message || "Failed to delete gst");
//         return;
//       }

//       setGstList((prev) => prev.filter((b) => b.name !== name));
//     } catch (err) {
//       alert("Error deleting gst");
//       console.error(err);
//     }
//   };



//   return (
//     <>
//       <div className="font-serif  ">
//         <div className=" flex gap-1  justify-center  p-2">
//           <div className="bg-white w-100 h-95  flex justify-center items-center flex-col gap-2  rounded">
//             <div className="   justify-center text-black">This is gst</div>
//             <div className=" justify-center  ">
//               <label htmlFor="" className="text-slate-700">Gst:</label>
//               <input
//                 type="text"
//                 placeholder="enter the gst"
//                 value={gstName}
//                 onChange={(e) => setGstName(e.target.value)}
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
//               {selectedGst && (
//                 <div className="m-4 text-black ">
//                   Selected Gst: {selectedGst}
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="">
//             <div className="bg-slate-600 h-95 w-70  rounded overflow-auto hide-scrollbar  pl-2 ">
//               <h2 className="   text-center">Gst</h2>
//               {gstList.length === 0 ? (
//                 <p className="text-center text-gray-600 ">
//                   No gst names added.
//                 </p>
//               ) : (
//                 <table className="border-collapse  px-2 cursor-pointer ">
//                   <thead>
//                     <tr>
//                       {/* <th className="border border-white ">#</th> */}
//                       {/* <th className="border border-white ">Gst Name</th> */}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {[...gstList]
//                       .sort((a, b) => {
//                         const startsWithInput = (name) =>
//                           name?.toString().toLowerCase().startsWith(gstName.toLowerCase());

//                         // Move matches to the top
//                         if (startsWithInput(a) && !startsWithInput(b))
//                           return -1;
//                         if (!startsWithInput(a) && startsWithInput(b)) return 1;
//                         return 0; // Preserve original order otherwise
//                       })
//                       .map((gst, index) => {
//                         const isMatch =
//                           gst.name.toLowerCase()

//                             .startsWith(gstName.toLowerCase()) &&
//                           gstName !== "";

//                         return (
//                           <tr
//                             key={index}
//                             className={
//                               isMatch ? "bg-black cursor-pointer  " : ""
//                             }
//                             onClick={() => setSelectedGst(gst)}
//                           >
//                             {/* <td className="border-b p-2">{index + 1}</td> */}
//                             <td className="border border-white w-60 text-center   font-serif">
//                               {gst.name}
//                             </td>
//                             <td className="text-center">
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation(); // Prevent triggering row click
//                                   handleDelete(gst.name);
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

// export default Gst;



import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Gst() {
  const [gstName, setGstName] = useState("");
  const [gstList, setGstList] = useState([]);
  const [selectedGst, setSelectedGst] = useState(null);

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
    <div className="bg-slate-800 text-white p-2 ">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 h-100 overflow-hidden">
        {/* Add Gst Card */}
        <div className="bg-white text-slate-900 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Add GST</h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              value={gstName.toUpperCase()}
              onChange={(e) => setGstName(e.target.value)}
              placeholder="Enter GST name"
              className="border border-slate-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-slate-500"
            />
            <button
              onClick={handleSave}
              className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-900 transition"
            >
              Save GST
            </button>
          </div>
          {selectedGst && (
            <div className="mt-4 text-sm text-slate-700">
              Selected GST:{" "}
              <span className="font-semibold text-slate-900">
                {selectedGst.name}
              </span>
            </div>
          )}
        </div>

        {/* Gst List Card */}
        <div className="bg-white text-slate-900 rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4 text-slate-800 text-center">
            GST List
          </h2>
          {gstList.length === 0 ? (
            <p className="text-center text-slate-500">No GSTs added.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-4 py-2">GST Name</th>
                  <th className="px-2 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {[...gstList]
                  .sort((a, b) => {
                    const startsWithInput = (name) =>
                      name?.toLowerCase().startsWith(gstName.toLowerCase());

                    if (startsWithInput(a.name) && !startsWithInput(b.name)) return -1;
                    if (!startsWithInput(a.name) && startsWithInput(b.name)) return 1;
                    return 0;
                  })
                  .map((gst, index) => {
                    const isMatch =
                      gst.name.toLowerCase().startsWith(gstName.toLowerCase()) &&
                      gstName !== "";

                    return (
                      <tr
                        key={index}
                        className={`${isMatch ? "bg-yellow-100" : "hover:bg-slate-100"
                          } cursor-pointer transition`}
                        onClick={() => setSelectedGst(gst)}
                      >
                        <td className="px-4 py-2 border-b border-slate-200">
                          {gst.name}
                        </td>
                        <td className="text-center border-b border-slate-200">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(gst.name);
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

export default Gst;
