// import React, { useState, useEffect, useRef } from "react";

// const VendorForm = () => {
//   const formRef = useRef(null);

//   const [bankList, setBankList] = useState([]);
//   const [sites, setSites] = useState([]);
//   const [formData, setFormData] = useState({
//     siteName: "",
//     accountName: "",
//     fullAddress: "",
//     city: "",
//     contactPersonName: "",
//     contactPersonNo: "",
//     emailId: "",
//     bankName: "",
//     bankAccountNo: "",
//     ifscCode: "",
//     panNo: "",
//     gstNo: "",
//     msmeNo: "",
//     accountGroup: "",
//     gstState: "",
//     tds: "",
//     //verifyIfsc: "",
//     // verifyGst: "",
//     itrDeclaration: "",
//     msmeType: "", // make sure this key exists
//     //majorActivity: "",
//     attachments: {
//       //itrDeclaration: null,
//       gstCertificate: null,
//       panCard: null,
//       cancelledCheque: null,
//       msme: null,
//     },
//   });

//   useEffect(() => {
//     const fetchSites = async () => {
//       try {
//         const res = await fetch("https://backendsystem-a26n.onrender.com/site/allsite");
//         const data = await res.json();
//         setSites(data);
//       } catch (err) {
//         console.error("Failed to fetch sites:", err);
//       }
//     };
//     fetchSites();
//   }, []);

//   useEffect(() => {
//     const fetchBanks = async () => {
//       try {
//         const res = await fetch("https://backendsystem-a26n.onrender.com/api/list");
//         const data = await res.json();
//         setBankList(data);
//       } catch (err) {
//         console.error("Failed to fetch banks:", err);
//       }
//     };
//     fetchBanks();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value, type, files } = e.target;

//     if (type === "file") {
//       setFormData((prev) => ({
//         ...prev,
//         attachments: {
//           ...prev.attachments,
//           [name]: files[0] || null,
//         },
//       }));
//     } else {
//       if (name === "msme" && value === "NO") {
//         setFormData((prev) => ({
//           ...prev,
//           msme: value,
//           msmeType: "",
//         }));
//       } else {
//         setFormData((prev) => ({
//           ...prev,
//           [name]: value,
//         }));
//       }
//       setFormData((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const form = new FormData();

//     for (const key in formData) {
//       if (key === "attachments") {
//         for (const fileKey in formData.attachments) {
//           if (formData.attachments[fileKey]) {
//             form.append(fileKey, formData.attachments[fileKey]);
//           }
//         }
//       } else {
//         form.append(key, formData[key]);
//       }
//     }

//     try {
//       const res = await fetch("https://backendsystem-a26n.onrender.com/vender/add", {
//         method: "POST",
//         body: form,
//       });

//       if (!res.ok) throw new Error("Failed to add vendor");

//       const data = await res.json();
//       console.log("Vendor Added:", data);


//       setFormData({
//         siteName: "",
//         accountName: "",
//         fullAddress: "",
//         city: "",
//         contactPersonName: "",
//         contactPersonNo: "",
//         emailId: "",
//         bankName: "",
//         bankAccountNo: "",
//         ifscCode: "",
//         panNo: "",
//         gstNo: "",
//         msmeNo: "",
//         accountGroup: "",
//         gstState: "",
//         tds: "",

//         msme: "",
//         msmeType: "",

//         attachments: {
//           gstCertificate: null,
//           panCard: null,
//           cancelledCheque: null,
//           msme: null,
//         },
//       });

//       if (formRef.current) formRef.current.reset();
//     } catch (err) {
//       console.error("Error submitting vendor:", err);
//       alert("Error submitting vendor, see console");
//     }
//   };

//   return (
//     <div className="p-2 ">
//       <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-slate-200 via-slate-800 to-slate-200 mb-6 flex justify-center">
//         NEW VENDOR
//       </h2>
//       <div className="w-300 mx-auto p-6 bg-white text-black shadow rounded-lg max-sm:w-100">
//         <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
//           {/* Select Inputs */}

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="text-gray-700 font-medium mb-1">
//                 Site Name
//               </label>
//               <select
//                 required
//                 name="siteName"
//                 value={formData.siteName}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2"
//               >
//                 <option value="">Select a site</option>
//                 {sites.map((site, idx) => (
//                   <option key={idx} value={site.fullName}>
//                     {site.fullName}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="text-gray-700 font-medium mb-1">
//                 Account Group
//               </label>
//               <select
//                 required
//                 name="accountGroup"
//                 value={formData.accountGroup}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 p-2 rounded"
//               >
//                 <option value="">Select Group</option>
//                 <option value="Sundry Creditors">
//                   TRADE PAYABLE(SUPPLIER)
//                 </option>
//                 <option value="Sundry Debtors">
//                   TRADE PAYABLE(CONTRACTOR)
//                 </option>
//                 <option value="Sundry Debtors">
//                   TRADE PAYABLE(TRANSPORTER)
//                 </option>
//               </select>
//             </div>

//             <div>
//               <label className="text-gray-700 font-medium mb-1">
//                 GST State
//               </label>
//               <select
//                 required
//                 name="gstState"
//                 value={formData.gstState}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 p-2 rounded"
//               >
//                 <option value="">Select State</option>
//                 <option value="Andman and Nicobar Islands">
//                   Andman and Nicobar Islands
//                 </option>
//                 <option value="Andhra Pradesh">Andhra Pradesh</option>
//                 <option value="Arunachal Pradesh">Arunachal Pradesh</option>
//                 <option value="Assam">Assam</option>
//                 <option value="Bihar">Bihar</option>
//                 <option value="Chandigarh">Chandigarh</option>
//                 <option value="Chhattisgarh">Chhattisgarh</option>
//                 <option value="Dadra and Nagar Haceli and Daman and Diu">
//                   Dadra and Nagar Haceli and Daman and Diu
//                 </option>
//                 <option value="Delhi">Delhi</option>
//                 <option value="Goa">Goa</option>
//                 <option value="Gujarat">Gujarat</option>
//                 <option value="Haryana">Haryana</option>
//                 <option value="Himachal Pradesh">Himachal Pradesh</option>
//                 <option value="Jammu and Kashmir">Jammu and Kashmir</option>
//                 <option value="Jharkhand">Jharkhand</option>
//                 <option value="Karnataka">Karnataka</option>
//                 <option value="Kerala">Kerala</option>
//                 <option value="Ladakh">Ladakh</option>
//                 <option value="Lakshadweep">Lakshadweep</option>
//                 <option value="Madhya Pradesh">Madhya Pradesh</option>
//                 <option value="Maharashtra">Maharashtra</option>
//                 <option value="Manipur">Manipur</option>
//                 <option value="Meghalaya">Meghalaya</option>
//                 <option value="Mizoram">Mizoram</option>
//                 <option value="Nagaland">Nagaland</option>
//                 <option value="Odisha">Odisha</option>
//                 <option value="pondicherry">pondicherry</option>
//                 <option value="Punjab">Punjab</option>
//                 <option value="Rajasthan">Rajasthan</option>
//                 <option value="Sikkim">Sikkim</option>
//                 <option value="Tamil Nadu">Tamil Nadu</option>
//                 <option value="Telangana">Telangana</option>
//                 <option value="Tripura">Tripura</option>
//                 <option value="Utter Pradesh">Utter Pradesh</option>
//                 <option value="Uttarakhand">Uttarakhand</option>
//                 <option value="West Bengal">West Bengal</option>
//               </select>
//             </div>
//             <div>
//               <label className="text-gray-700 font-medium mb-1">GST No</label>
//               <input
//                 required
//                 type="text"
//                 name="gstNo"
//                 value={formData.gstNo}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 p-2 rounded"
//               />
//             </div>

//             <div>
//               <label className="text-gray-700 font-medium mb-1">
//                 Bank Name
//               </label>
//               <select
//                 required
//                 name="bankName"
//                 value={formData.bankName}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 rounded-md px-3 py-2"
//               >
//                 <option value="">Select a bank</option>
//                 {bankList.map((bank, idx) => (
//                   <option key={idx} value={bank.name}>
//                     {bank.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="text-gray-700 font-medium mb-1">TDS</label>
//               <select

//                 name="tds"
//                 value={formData.tds}
//                 required
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 p-2 rounded"
//               >
//                 <option value="">Select TDS</option>
//                 <option value="194-Q">194-Q</option>
//                 <option value="194-I">194-I (RENT)</option>
//                 <option value="194-H">194-H</option>
//                 <option value="194-C">194-C</option>
//                 <option value="194-JA">194-JA</option>
//                 <option value="194-A">194-A</option>
//                 <option value="194-JB">194-JB</option>
//                 <option value="194-I">194-I(PNM)</option>
//                 <option value="194-B">194-B</option>
//                 <option value="194-Q+194-C">194-Q+194-C</option>

//                 <option value="Not Applicable">Not Applicable</option>
//               </select>
//             </div>
//           </div>

//           {/* Text Inputs */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {[
//               ["accountName", "Account Name"],
//               ["fullAddress", "Full Address"],
//               ["city", "City"],
//               ["contactPersonName", "Contact Person Name"],
//               ["contactPersonNo", "Contact Person No"],
//               ["emailId", "Email ID"],
//               ["bankAccountNo", "Bank A/c No"],
//               ["ifscCode", "IFSC Code"],
//               ["panNo", "PAN No"],
//             ].map(([field, label]) => (
//               <div key={field}>
//                 <label className="text-gray-700 font-medium mb-1">
//                   {label}
//                 </label>
//                 <input
//                   required
//                   type="text"
//                   name={field}
//                   value={formData[field]}
//                   onChange={handleInputChange}
//                   className="w-full border border-gray-300 p-2 rounded"
//                 />
//               </div>
//             ))}
//           </div>

//           {/* MSME Type select fixed */}

//           {/* MSME YES/NO */}
//           {/* <div>
//             <label className="text-gray-700 font-medium mb-1 block">MSME</label>
//             <select
//               required
//               name="msme"
//               value={formData.msme}
//               onChange={handleInputChange}
//               className="w-full border border-gray-300 p-2 rounded"
//             >
//               <option value="">Select MSME</option>
//               <option value="YES">YES</option>
//               <option value="NO">NO</option>
//             </select>
//           </div> */}

//           {/* Show MSME Type only if MSME is YES */}
//           {/* {formData.msme === "YES" && (
//             <div>
//               <label className="text-gray-700 font-medium mb-1 block">
//                 MSME Type
//               </label>
//               <select
//                 required
//                 name="msmeType"
//                 value={formData.msmeType}
//                 onChange={handleInputChange}
//                 className="w-full border border-gray-300 p-2 rounded"
//               >
//                 <option value="">Select MSME Type</option>
//                 <option value="Type A">Type A</option>
//                 <option value="Type B">Type B</option>
//                 <option value="Type C">Type C</option>
//               </select>
//             </div>
//           )} */}

//           {/* File Uploads */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {[
//               ["gstCertificate", "GST Certificate"],
//               ["panCard", "PAN Card "],
//               ["cancelledCheque", " Cancelled Cheque"],
//               ["msme", "MSME "],
//             ].map(([field, label]) => (
//               <div key={field}>
//                 <label className="text-gray-700 font-medium mb-1">
//                   {label}
//                 </label>
//                 <input
//                   required
//                   type="file"
//                   id={field}
//                   name={field}
//                   onChange={handleInputChange}
//                   className="hidden"

//                 />
//                 <label
//                   htmlFor={field}
//                   className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-3  rounded"
//                 >
//                   Choose File
//                 </label>
//                 <span className="text-gray-600 text-sm truncate max-w-[200px]">
//                   {formData.attachments[field]?.name || "No file selected"}
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* Submit Button */}
//           <div className="pt-4 flex justify-center ">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VendorForm;





import React, { useState, useEffect, useRef } from "react";

export default function VendorForm() {
  const formRef = useRef(null);

  const [bankList, setBankList] = useState([]);
  const [sites, setSites] = useState([]);

  const [formData, setFormData] = useState({
    siteName: "",
    accountName: "",
    fullAddress: "",
    city: "",
    contactPersonName: "",
    contactPersonNo: "",
    emailId: "",
    bankName: "",
    bankAccountNo: "",
    ifscCode: "",
    panNo: "",
    gstNo: "",
    accountGroup: "",
    gstState: "",
    tds: "",
    attachments: {
      gstCertificate: null,
      panCard: null,
      cancelledCheque: null,
      msme: null,
    },
  });

  useEffect(() => {
    fetch("https://backendsystem-a26n.onrender.com/site/allsite")
      .then((res) => res.json())
      .then(setSites);

    fetch("https://backendsystem-a26n.onrender.com/api/list")
      .then((res) => res.json())
      .then(setBankList);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        attachments: {
          ...prev.attachments,
          [name]: files[0],
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "attachments") {
        Object.keys(formData.attachments).forEach((fileKey) => {
          if (formData.attachments[fileKey]) {
            form.append(fileKey, formData.attachments[fileKey]);
          }
        });
      } else {
        form.append(key, formData[key]);
      }
    });

    await fetch("https://backendsystem-a26n.onrender.com/vender/add", {
      method: "POST",
      body: form,
    });

    alert("Vendor Added ✅");
    formRef.current.reset();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6">ERP Panel</h2>
        <ul className="space-y-4 text-gray-300">
          <li className="hover:text-white cursor-pointer">Dashboard</li>
          <li className="hover:text-white cursor-pointer">Vendors</li>
          <li className="hover:text-white cursor-pointer">Reports</li>
          <li className="hover:text-white cursor-pointer">Settings</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Vendor Registration
          </h1>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

            {/* Row Layout */}
            <div className="grid grid-cols-4 gap-4">
              <select name="siteName" onChange={handleChange} required className="input col-span-1">
                <option value="">Site</option>
                {sites.map((s, i) => (
                  <option key={i}>{s.fullName}</option>
                ))}
              </select>

              <input name="accountName" placeholder="Account Name" className="input col-span-2" onChange={handleChange} required />

              <input name="city" placeholder="City" className="input col-span-1" onChange={handleChange} required />

              <input name="contactPersonName" placeholder="Contact Person" className="input col-span-1" onChange={handleChange} required />

              <input name="contactPersonNo" placeholder="Mobile" className="input col-span-1" onChange={handleChange} required />

              <input name="emailId" placeholder="Email" className="input col-span-2" onChange={handleChange} required />
            </div>

            {/* Bank Row */}
            <div className="grid grid-cols-4 gap-4">
              <select name="bankName" onChange={handleChange} required className="input">
                <option value="">Bank</option>
                {bankList.map((b, i) => (
                  <option key={i}>{b.name}</option>
                ))}
              </select>

              <input name="bankAccountNo" placeholder="Account No" className="input" onChange={handleChange} required />

              <input name="ifscCode" placeholder="IFSC" className="input" onChange={handleChange} required />

              <select name="tds" required className="input" onChange={handleChange}>
                <option value="">TDS</option>
                <option value="194C">194C</option>
                <option value="194J">194J</option>
                <option value="NA">NA</option>
              </select>
            </div>

            {/* Tax Row */}
            <div className="grid grid-cols-4 gap-4">
              <input name="gstNo" placeholder="GST No" className="input" onChange={handleChange} required />
              <input name="panNo" placeholder="PAN" className="input" onChange={handleChange} required />
              <input name="fullAddress" placeholder="Full Address" className="input col-span-2" onChange={handleChange} required />
            </div>

            {/* Upload Row */}
            <div className="grid grid-cols-4 gap-4">
              {Object.keys(formData.attachments).map((field) => (
                <div key={field} className="border rounded-lg p-2 flex flex-col">
                  <span className="text-sm text-gray-600 capitalize mb-1">{field}</span>
                  <input type="file" name={field} onChange={handleChange} />
                </div>
              ))}
            </div>

            {/* Submit */}
            <div className="flex justify-end">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow">
                Save Vendor
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #d1d5db;
          padding: 8px;
          border-radius: 6px;
          font-size: 14px;
        }
        .input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 1px #2563eb;
        }
      `}</style>
    </div>
  );
}
