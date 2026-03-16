// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

// function Repo() {
//   const [fullName, setFullName] = useState("");
//   const [sortName, setSortName] = useState("");
//   const [units, setunits] = useState([]);
//   const [searchText, setSearchText] = useState("");

//   const API_URL = "http://localhost:5000/unit";

//   // ✅ Realtime match and pin to top as user types fullName
//   useEffect(() => {
//     const trimmed = fullName.trim().toLowerCase();
//     if (!trimmed) return;

//     const index = units.findIndex((unit) =>
//       unit.fullName.toLowerCase().startsWith(trimmed)
//     );

//     if (index > 0) {
//       const updated = [...units];
//       const [matched] = updated.splice(index, 1);
//       setunits([matched, ...updated]);
//     }
//   }, [fullName, units]);



//   // ✅ On Save
//   // const handleSave = () => {
//   //   const trimmedFullName = fullName.trim();
//   //   const trimmedSortName = sortName.trim();

//   //   if (!trimmedFullName || !trimmedSortName) {
//   //     alert("Both Full Name and Sort Name are required.");
//   //     return;
//   //   }

//   //   const exists = units.find(
//   //     (unit) =>
//   //       unit.fullName.toLowerCase() === trimmedFullName.toLowerCase() &&
//   //       unit.sortName.toLowerCase() === trimmedSortName.toLowerCase()
//   //   );

//   //   if (exists) {
//   //     alert("This unit already exists.");
//   //     return;
//   //   }

//   //   // Add to top
//   //   setunits([
//   //     { fullName: trimmedFullName, sortName: trimmedSortName },
//   //     ...units,
//   //   ]);

//   //   setFullName("");
//   //   setSortName("");
//   // };

//   // const handleDelete = (indexToDelete) => {
//   //   setunits(units.filter((_, idx) => idx !== indexToDelete));
//   // };
// useEffect(() => {
//     const fetchunits = async () => {
//       try {
//         const res = await fetch(`${API_URL}/allunit`);
//         const data = await res.json();
//         setunits(data);
//       } catch (err) {
//         console.error("Failed to fetch units:", err);
//       }
//     };

//     fetchunits();
//   }, []);

//   const handleSave = async () => {
//     const trimmedFullName = fullName.trim();
//     const trimmedSortName = sortName.trim();

//     if (!trimmedFullName || !trimmedSortName) {
//       alert("Both Full Name and Sort Name are required.");
//       return;
//     }

//     try {
//       const response = await fetch(`${API_URL}/addunit`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           fullName: trimmedFullName,
//           sortName: trimmedSortName,
//         }),
//         credentials: "include",
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         alert(result.message || "Failed to save unit.");
//         return;
//       }

//       setunits([result, ...units]);
//       setFullName("");
//       setSortName("");
//     } catch (err) {
//       console.error(err);
//       alert("Error saving unit");
//     }
//   };

// const handleDelete = async (unitId) => {
//   try {
//     const response = await fetch(`${API_URL}/${unitId}`, {
//       method: "DELETE",
//     });

//     if (!response.ok) {
//       alert("Failed to delete");
//       return;
//     }

//     setunits((prev) => prev.filter((unit) => unit._id !== unitId));
//   } catch (err) {
//     console.error(err);
//     alert("Error deleting unit");
//   }
// };


//   const truncateText = (text, maxLength = 12) => {
//     if (text.length <= maxLength) return text;
//     return text.slice(0, maxLength) + "...";
//   };

//   return (
//     <div className="flex gap-1 p-2 justify-center font-serif">
//       {/* Input Form */}
//       <div className="bg-slate-500 w-100 h-95  flex justify-center items-center flex-col gap-2  rounded ">
//         <h1> Unit</h1>
//         <div>
//           <label>Full Name:</label>
//           <input
            
//             type="text"
//             placeholder="Enter full name"
//             value={fullName}
//             onChange={(e) => setFullName(e.target.value)}
//             className=" px-1  outline-none rounded bg-white text-black"
//           />
//         </div>
//         <div>
//           <label>Sort Name:</label>
//           <input
         
//             type="text"
//             placeholder="Enter sort name"
//             value={sortName}
//             maxLength={4}
//             onChange={(e) => setSortName(e.target.value)}
//             className="px-1   outline-none rounded bg-white text-black"
//           />
//         </div>
//         <div>
//           <Button
//             variant="outline"
//             className="hover:bg-blue-900 bg-blue-800 text-white active:bg-black"
//             onClick={handleSave}
//           >
//             Save
//           </Button>
//         </div>
//       </div>

//       {/* Table */}
//       <div id="showbox" className="h-95 w-70 bg-slate-600  px-2 rounded">
//         <h1 className="flex justify-center">units</h1>
//         <table className="w-full table-auto text-white">
//           <thead>
//             <tr>
//               {/* <th className="border border-white px-2 py-1">Sort Name</th>
//               <th className="border border-white px-2 py-1">Full Name</th>
//               <th className="border border-white px-2 py-1">Actions</th> */}
//             </tr>
//           </thead>
//           <tbody>
//             {units.length === 0 && (
//               <tr>
//                 <td colSpan={3} className="text-center py-4 text-gray-300">
//                   No unit added.
//                 </td>
//               </tr>
//             )}
//             {units.map((unit, index) => {
//               const isMatch =
//                 fullName.trim() &&
//                 unit.fullName.toLowerCase().startsWith(fullName.toLowerCase());

//               return (
//                 <tr
//                   key={index}
//                   className={`cursor-pointer  ${
//                     isMatch ? "bg-black" : ""
//                   } `}
//                 >
//                   <td className="  border text-center border-white">
//                     {unit.sortName}
//                   </td>
//                   <td className=" border text-center border-white w-50">
//                     {truncateText(unit.fullName)}
//                   </td>
//                   <td className="text-center">
//                     <button
//                        onClick={() => handleDelete(unit._id)}
//                       className="     rounded hover:bg-red-700"
//                     >
//                      <FontAwesomeIcon icon={faTrashCan} />
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default Repo;


import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Repo() {
  const [fullName, setFullName] = useState("");
  const [sortName, setSortName] = useState("");
  const [units, setunits] = useState([]);

  const API_URL = "http://localhost:5000/unit";

  useEffect(() => {
    const fetchunits = async () => {
      try {
        const res = await fetch(`${API_URL}/allunit`);
        const data = await res.json();
        setunits(data);
      } catch (err) {
        console.error("Failed to fetch units:", err);
      }
    };

    fetchunits();
  }, []);

  useEffect(() => {
    const trimmed = fullName.trim().toLowerCase();
    if (!trimmed) return;

    const index = units.findIndex((unit) =>
      unit.fullName.toLowerCase().startsWith(trimmed)
    );

    if (index > 0) {
      const updated = [...units];
      const [matched] = updated.splice(index, 1);
      setunits([matched, ...updated]);
    }
  }, [fullName, units]);

  const handleSave = async () => {
    const trimmedFullName = fullName.trim();
    const trimmedSortName = sortName.trim();

    if (!trimmedFullName || !trimmedSortName) {
      alert("Both Full Name and Sort Name are required.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/addunit`, {
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
        alert(result.message || "Failed to save unit.");
        return;
      }

      setunits([result, ...units]);
      setFullName("");
      setSortName("");
    } catch (err) {
      console.error(err);
      alert("Error saving unit");
    }
  };

  const handleDelete = async (unitId) => {
    try {
      const response = await fetch(`${API_URL}/${unitId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        alert("Failed to delete");
        return;
      }

      setunits((prev) => prev.filter((unit) => unit._id !== unitId));
    } catch (err) {
      console.error(err);
      alert("Error deleting unit");
    }
  };

  const truncateText = (text, maxLength = 18) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="bg-slate-800 text-white p-2 ">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-2 h-100 overflow-hidden">
        {/* Form Card */}
        <div className="bg-white text-slate-900 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-slate-800">Add Unit</h2>

          <div className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 text-sm">Full Name:</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter full name"
                className="w-full border border-slate-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Sort Name:</label>
              <input
                type="text"
                value={sortName}
                maxLength={4}
                onChange={(e) => setSortName(e.target.value)}
                placeholder="Short name (e.g. UN01)"
                className="w-full border border-slate-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>

            <button
              onClick={handleSave}
              className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-900 transition"
            >
              Save
            </button>
          </div>
        </div>

        {/* Unit List Card */}
        <div className="bg-white text-slate-900 rounded-lg shadow-lg p-6 overflow-auto max-h-[80vh]">
          <h2 className="text-2xl font-bold mb-4 text-slate-800 text-center">
            Unit List
          </h2>

          {units.length === 0 ? (
            <p className="text-center text-slate-500">No units added.</p>
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-4 py-2">Sort</th>
                  <th className="px-4 py-2">Full Name</th>
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {units.map((unit) => {
                  const isMatch =
                    fullName.trim() &&
                    unit.fullName.toLowerCase().startsWith(fullName.toLowerCase());

                  return (
                    <tr
                      key={unit._id}
                      className={`${
                        isMatch ? "bg-yellow-100" : "hover:bg-slate-100"
                      } transition cursor-pointer`}
                    >
                      <td className="border-b px-4 py-2 text-center">
                        {unit.sortName}
                      </td>
                      <td className="border-b px-4 py-2">
                        {truncateText(unit.fullName)}
                      </td>
                      <td className="border-b px-4 py-2 text-center">
                        <button
                          onClick={() => handleDelete(unit._id)}
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

export default Repo;

