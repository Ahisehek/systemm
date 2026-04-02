import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

const ItemForm = () => {
  const navigate = useNavigate();
  //  useEffect(() => {
  //     const socket = io("http://localhost:5000", {
  //       withCredentials: true,
  //     });

  //     socket.on("item_added", (newItem) => {
  //       toast.success(`🎉 New Item Added: ${newItem.siteName}`, {
  //         position: "top-center",
  //         autoClose: 3000,
  //       });
  //     });

  //     return () => {
  //       socket.disconnect();
  //     };
  //   }, []);

  /* ------fetch data form database-------- */
  useEffect(() => {
    const fetchGsts = async () => {
      try {
        const res = await fetch("https://backendsystem-a26n.onrender.com/gst/gstlist");
        const data = await res.json();
        setGstList(data);
      } catch (err) {
        console.error("Failed to fetch gsts:", err);
      }
    };
    fetchGsts();
  }, []);

  useEffect(() => {
    const fetchIgroups = async () => {
      try {
        const res = await fetch("https://backendsystem-a26n.onrender.com/igroup/list");
        const data = await res.json();
        setIgroupList(data);
      } catch (err) {
        console.error("Failed to fetch igroups:", err);
      }
    };
    fetchIgroups();
  }, []);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const res = await fetch("https://backendsystem-a26n.onrender.com/site/allsite");
        const data = await res.json();
        setSites(data);
      } catch (err) {
        console.error("Failed to fetch sites:", err);
      }
    };

    fetchSites();
  }, []);

  useEffect(() => {
    const fetchunits = async () => {
      try {
        const res = await fetch("https://backendsystem-a26n.onrender.com/unit/allunit");
        const data = await res.json();
        setunits(data);
      } catch (err) {
        console.error("Failed to fetch units:", err);
      }
    };

    fetchunits();
  }, []);
  const [igroupList, setIgroupList] = useState([]);
  const [units, setunits] = useState([]);
  const [sites, setSites] = useState([]);
  const [items, setItems] = useState([]);
  const [gstList, setGstList] = useState([]);
  const [formData, setFormData] = useState({
    siteName: "",
    itemName: "",
    itemGroup: "",
    gst: "",
    hsnCode: "",
    partsNo: "",
    unit: "",
  });

  // const sites = ["Site A", "Site B", "Site C"];
  //const itemGroups = ["Group A", "Group B", "Group C"];
  //const gstRates = ["5%", "12%", "18%", "28%"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // get all form data to show the another page

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {


      const response = await fetch("https://backendsystem-a26n.onrender.com/item/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.status === 401 || response.status === 403) {
        alert("Unauthorized! Please login first");
        navigate("/");   // ✅ redirect to login
        return;
      }
      const result = await response.json();
      if (response.ok) {
        console.log("Item added:", result);
        //toast.success("Item added successfully!");
        setFormData({
          siteName: "",
          itemName: "",
          itemGroup: "",
          gst: "",
          hsnCode: "",
          partsNo: "",
          unit: "",
        }); // Reset form
      } else {
        console.error("Error adding item:", result.message);
        alert("Error adding item");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("Error during form submission");
    }
  };

  return (
    <>
      <div className=" p-2 ">
        <h2 className="text-2xl  font-semibold  text-slate-800 bg-white flex justify-center rounded">
          NEW ITEM
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-300  mx-auto p-6 bg-white   text-black  rounded-lg shadow-md space-y-6  max-sm:w-100"
        >
          <div className="grid grid-cols-2 gap-2 max-sm:grid max-sm:grid-cols-1">
            {/* Site Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Site Name
              </label>
              <select
                required
                name="siteName"
                value={formData.siteName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="" className="">
                  Select a site
                </option>
                {sites.map((site, idx) => (
                  <option key={idx} value={site.fullName} className="w-10">
                    {site.fullName}
                  </option>
                ))}
              </select>
            </div>

            {/* Item Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Name
              </label>
              <input
                required
                type="text"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                placeholder="Enter item name"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            {/* Item Group */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Item Group
              </label>
              <select
                required
                name="itemGroup"
                value={formData.itemGroup}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="" className="">
                  Select a site
                </option>
                {igroupList.map((igroup, idx) => (
                  <option key={idx} value={igroup.name}>
                    {igroup.name}
                  </option>
                ))}
              </select>
            </div>

            {/* GST */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GST
              </label>
              <select
                required
                name="gst"
                value={formData.gst}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select GST rate</option>
                {gstList.map((gst, idx) => (
                  <option key={idx} value={gst.name}>
                    {gst.name}
                  </option>
                ))}
              </select>
            </div>


            {/* HSN Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                HSN Code
              </label>
              <input
                required
                type="text"
                name="hsnCode"
                value={formData.hsnCode}
                onChange={handleChange}
                placeholder="Enter HSN code"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            {/* Parts No */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Parts No
              </label>
              <input
                required
                type="text"
                name="partsNo"
                value={formData.partsNo}
                onChange={handleChange}
                placeholder="Enter parts number"
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>

            {/* 1st Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                1st Unit
              </label>
              <select
                required
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select unit</option>
                {units.map((unit, idx) => (
                  <option key={idx} value={unit.sortName}>
                    {unit.sortName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Submit Button */}
          <div className="flex justify-center bg-white ">
            <button
              type="submit"
              className="px-6 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-900 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ItemForm;

// import React, { useState, useEffect } from "react";

// const ItemForm = () => {
//   const [igroupList, setIgroupList] = useState([]);
//   const [units, setunits] = useState([]);
//   const [sites, setSites] = useState([]);

//   const [formData, setFormData] = useState({
//     siteName: "",
//     itemName: "",
//     itemGroup: "",
//     gst: "",
//     hsnCode: "",
//     partsNo: "",
//     unit: "",
//   });

//   const gstRates = ["5%", "12%", "18%", "28%"];

//   // Fetch Data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [siteRes, igroupRes, unitRes] = await Promise.all([
//           fetch("http://localhost:5000/site/allsite"),
//           fetch("http://localhost:5000/igroup/list"),
//           fetch("http://localhost:5000/unit/allunit"),
//         ]);

//         setSites(await siteRes.json());
//         setIgroupList(await igroupRes.json());
//         setunits(await unitRes.json());
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       }
//     };
//     fetchData();
//   }, []);

//   // Form handlers
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");

//       const response = await fetch("http://localhost:5000/item/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         console.log("Item added:", result);
//         setFormData({
//           siteName: "",
//           itemName: "",
//           itemGroup: "",
//           gst: "",
//           hsnCode: "",
//           partsNo: "",
//           unit: "",
//         });
//       } else {
//         console.error("Error adding item:", result.message);
//         alert("Error adding item");
//       }
//     } catch (error) {
//       console.error("Error during form submission:", error);
//       alert("Error during form submission");
//     }
//   };

//   return (
//     <div className="w-screen text-black  bg-gradient-to-br from-blue-50 to-white flex items-center justify-center overflow-hidden">
//       <div className="w-full max-w-6xl bg-white rounded-xl shadow-2xl p-6">
//         <h2 className="text-2xl font-bold text-blue-700 text-center mb-6">
//         Add New Item
//         </h2>

//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
//         >
//           {/* Site Name */}
//           <div>
//             <label className="block font-medium text-gray-700">Site Name</label>
//             <select
//               name="siteName"
//               value={formData.siteName}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded"
//             >
//               <option value="">Select a site</option>
//               {sites.map((site, idx) => (
//                 <option key={idx} value={site.fullName}>
//                   {site.fullName}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Item Name */}
//           <div>
//             <label className="block font-medium text-gray-700">Item Name</label>
//             <input
//               type="text"
//               name="itemName"
//               value={formData.itemName}
//               onChange={handleChange}
//               placeholder="Enter item name"
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>

//           {/* Item Group */}
//           <div>
//             <label className="block font-medium text-gray-700">Item Group</label>
//             <select
//               name="itemGroup"
//               value={formData.itemGroup}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded"
//             >
//               <option value="">Select a group</option>
//               {igroupList.map((igroup, idx) => (
//                 <option key={idx} value={igroup.name}>
//                   {igroup.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* GST */}
//           <div>
//             <label className="block font-medium text-gray-700">GST Rate</label>
//             <select
//               name="gst"
//               value={formData.gst}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded"
//             >
//               <option value="">Select GST rate</option>
//               {gstRates.map((rate) => (
//                 <option key={rate} value={rate}>
//                   {rate}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* HSN Code */}
//           <div>
//             <label className="block font-medium text-gray-700">HSN Code</label>
//             <input
//               type="text"
//               name="hsnCode"
//               value={formData.hsnCode}
//               onChange={handleChange}
//               placeholder="Enter HSN code"
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>

//           {/* Parts No */}
//           <div>
//             <label className="block font-medium text-gray-700">Parts No</label>
//             <input
//               type="text"
//               name="partsNo"
//               value={formData.partsNo}
//               onChange={handleChange}
//               placeholder="Enter parts number"
//               className="w-full px-3 py-2 border rounded"
//             />
//           </div>

//           {/* Unit */}
//           <div>
//             <label className="block font-medium text-gray-700">1st Unit</label>
//             <select
//               name="unit"
//               value={formData.unit}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded"
//             >
//               <option value="">Select unit</option>
//               {units.map((unit, idx) => (
//                 <option key={idx} value={unit.sortName}>
//                   {unit.sortName}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Submit Button */}
//           <div className="col-span-1 md:col-span-2 flex justify-center pt-4">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//             >
//               Submit Item
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ItemForm;
