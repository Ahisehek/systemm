import React, { useState, useEffect, useRef } from "react";

const VendorForm = () => {
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
    msmeNo: "",
    accountGroup: "",
    gstState: "",
    tds: "",
    //verifyIfsc: "",
    // verifyGst: "",
    itrDeclaration: "",
    msmeType: "", // make sure this key exists
    //majorActivity: "",
    attachments: {
      //itrDeclaration: null,
      gstCertificate: null,
      panCard: null,
      cancelledCheque: null,
      msme: null,
    },
  });

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const res = await fetch("https://floy-hailstoned-nonelectrically.ngrok-free.dev/site/allsite");
        const data = await res.json();
        setSites(data);
      } catch (err) {
        console.error("Failed to fetch sites:", err);
      }
    };
    fetchSites();
  }, []);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await fetch("https://floy-hailstoned-nonelectrically.ngrok-free.dev/api/list");
        const data = await res.json();
        setBankList(data);
      } catch (err) {
        console.error("Failed to fetch banks:", err);
      }
    };
    fetchBanks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        attachments: {
          ...prev.attachments,
          [name]: files[0] || null,
        },
      }));
    } else {
      if (name === "msme" && value === "NO") {
        setFormData((prev) => ({
          ...prev,
          msme: value,
          msmeType: "",
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    for (const key in formData) {
      if (key === "attachments") {
        for (const fileKey in formData.attachments) {
          if (formData.attachments[fileKey]) {
            form.append(fileKey, formData.attachments[fileKey]);
          }
        }
      } else {
        form.append(key, formData[key]);
      }
    }

    try {
      const res = await fetch("https://floy-hailstoned-nonelectrically.ngrok-free.dev/vender/add", {
        method: "POST",
        body: form,
      });

      if (!res.ok) throw new Error("Failed to add vendor");

      const data = await res.json();
      console.log("Vendor Added:", data);


      setFormData({
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
        msmeNo: "",
        accountGroup: "",
        gstState: "",
        tds: "",

        msme: "",
        msmeType: "",

        attachments: {
          gstCertificate: null,
          panCard: null,
          cancelledCheque: null,
          msme: null,
        },
      });

      if (formRef.current) formRef.current.reset();
    } catch (err) {
      console.error("Error submitting vendor:", err);
      alert("Error submitting vendor, see console");
    }
  };

  return (
    <div className="p-2 ">
      <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-slate-200 via-slate-800 to-slate-200 mb-6 flex justify-center">
        NEW VENDOR
      </h2>
      <div className="w-300 mx-auto p-6 bg-white text-black shadow rounded-lg max-sm:w-100">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {/* Select Inputs */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700 font-medium mb-1">
                Site Name
              </label>
              <select
                required
                name="siteName"
                value={formData.siteName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select a site</option>
                {sites.map((site, idx) => (
                  <option key={idx} value={site.fullName}>
                    {site.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-gray-700 font-medium mb-1">
                Account Group
              </label>
              <select
                required
                name="accountGroup"
                value={formData.accountGroup}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Select Group</option>
                <option value="Sundry Creditors">
                  TRADE PAYABLE(SUPPLIER)
                </option>
                <option value="Sundry Debtors">
                  TRADE PAYABLE(CONTRACTOR)
                </option>
                <option value="Sundry Debtors">
                  TRADE PAYABLE(TRANSPORTER)
                </option>
              </select>
            </div>

            <div>
              <label className="text-gray-700 font-medium mb-1">
                GST State
              </label>
              <select
                required
                name="gstState"
                value={formData.gstState}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Select State</option>
                <option value="Andman and Nicobar Islands">
                  Andman and Nicobar Islands
                </option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chandigarh">Chandigarh</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Dadra and Nagar Haceli and Daman and Diu">
                  Dadra and Nagar Haceli and Daman and Diu
                </option>
                <option value="Delhi">Delhi</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Lakshadweep">Lakshadweep</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="pondicherry">pondicherry</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Utter Pradesh">Utter Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>
            <div>
              <label className="text-gray-700 font-medium mb-1">GST No</label>
              <input
                required
                type="text"
                name="gstNo"
                value={formData.gstNo}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div>
              <label className="text-gray-700 font-medium mb-1">
                Bank Name
              </label>
              <select
                required
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select a bank</option>
                {bankList.map((bank, idx) => (
                  <option key={idx} value={bank.name}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-gray-700 font-medium mb-1">TDS</label>
              <select

                name="tds"
                value={formData.tds}
                required
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Select TDS</option>
                <option value="194-Q">194-Q</option>
                <option value="194-I">194-I (RENT)</option>
                <option value="194-H">194-H</option>
                <option value="194-C">194-C</option>
                <option value="194-JA">194-JA</option>
                <option value="194-A">194-A</option>
                <option value="194-JB">194-JB</option>
                <option value="194-I">194-I(PNM)</option>
                <option value="194-B">194-B</option>
                <option value="194-Q+194-C">194-Q+194-C</option>

                <option value="Not Applicable">Not Applicable</option>
              </select>
            </div>
          </div>

          {/* Text Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["accountName", "Account Name"],
              ["fullAddress", "Full Address"],
              ["city", "City"],
              ["contactPersonName", "Contact Person Name"],
              ["contactPersonNo", "Contact Person No"],
              ["emailId", "Email ID"],
              ["bankAccountNo", "Bank A/c No"],
              ["ifscCode", "IFSC Code"],
              ["panNo", "PAN No"],
            ].map(([field, label]) => (
              <div key={field}>
                <label className="text-gray-700 font-medium mb-1">
                  {label}
                </label>
                <input
                  required
                  type="text"
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
            ))}
          </div>

          {/* MSME Type select fixed */}

          {/* MSME YES/NO */}
          <div>
            <label className="text-gray-700 font-medium mb-1 block">MSME</label>
            <select
              required
              name="msme"
              value={formData.msme}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="">Select MSME</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>

          {/* Show MSME Type only if MSME is YES */}
          {formData.msme === "YES" && (
            <div>
              <label className="text-gray-700 font-medium mb-1 block">
                MSME Type
              </label>
              <select
                required
                name="msmeType"
                value={formData.msmeType}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              >
                <option value="">Select MSME Type</option>
                <option value="Type A">Type A</option>
                <option value="Type B">Type B</option>
                <option value="Type C">Type C</option>
              </select>
            </div>
          )}

          {/* File Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["gstCertificate", "GST Certificate"],
              ["panCard", "PAN Card "],
              ["cancelledCheque", " Cancelled Cheque"],
              ["msme", "MSME "],
            ].map(([field, label]) => (
              <div key={field}>
                <label className="text-gray-700 font-medium mb-1">
                  {label}
                </label>
                <input
                  required
                  type="file"
                  id={field}
                  name={field}
                  onChange={handleInputChange}
                  className="hidden"

                />
                <label
                  htmlFor={field}
                  className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-3  rounded"
                >
                  Choose File
                </label>
                <span className="text-gray-600 text-sm truncate max-w-[200px]">
                  {formData.attachments[field]?.name || "No file selected"}
                </span>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="pt-4 flex justify-center ">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorForm;

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
//     itrDeclaration: null,
//     gstCertificate: null,
//     panCard: null,
//     cancelledCheque: null,
//     msmeAttachment: null,
//     msme: "",
//     msmeType: "",
//     majorActivity: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [fileNames, setFileNames] = useState({
//     itrDeclaration: "No file selected",
//     gstCertificate: "No file selected",
//     panCard: "No file selected",
//     cancelledCheque: "No file selected",
//     msmeAttachment: "No file selected",
//   });

//   useEffect(() => {
//     const fetchSites = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/site/allsite");
//         const data = await res.json();
//         setSites(data);
//       } catch (err) {
//         console.error("Failed to fetch sites:", err);
//       }
//     };
//     fetchSites();

//     const fetchBanks = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/list");
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
//       setFormData((prev) => ({ ...prev, [name]: files[0] || null }));
//       setFileNames((prev) => ({
//         ...prev,
//         [name]: files[0]?.name || "No file selected",
//       }));
//     } else {
//       // clear msmeType when msme = NO
//       if (name === "msme" && value === "NO") {
//         setFormData((prev) => ({ ...prev, msme: value, msmeType: "" }));
//       } else {
//         setFormData((prev) => ({ ...prev, [name]: value }));
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     Object.entries(formData).forEach(([key, value]) => {
//       if (value) form.append(key, value);
//     });
//     try {
//       const res = await fetch("http://localhost:5000/vender/add", {
//         method: "POST",
//         body: form,
//       });
//       if (!res.ok) throw new Error("Submit failed");
//       const data = await res.json();
//       console.log("Vendor Added:", data);
//       formRef.current.reset();
//       setFormData((prev) =>
//         Object.fromEntries(Object.keys(prev).map((k) => [k, ""]))
//       );
//       setFileNames((prev) =>
//         Object.fromEntries(
//           Object.keys(prev).map((k) => [k, "No file selected"])
//         )
//       );
//     } catch (err) {
//       console.error(err);
//       alert("Error submitting");
//     }
//   };

//   return (
//     <div className="text-black w-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center overflow-hidden">
//       <div className="w-full max-w-6xl bg-white shadow-2xl rounded-xl p-8 h-[95%] overflow-hidden flex flex-col">
//         <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
//           New Vendor
//         </h2>
//         <form
//           ref={formRef}
//           onSubmit={handleSubmit}
//           className="flex-1 grid grid-cols-2 gap-6 text-sm overflow-y-auto"
//         >
//           {/** Left Column Fields */}
//           <div className="space-y-4">
//             {[
//               [
//                 "siteName",
//                 "Site Name",
//                 "select",
//                 sites.map((s) => ({ val: s.fullName, label: s.fullName })),
//               ],
//               ["accountName", "Account Name"],
//               ["fullAddress", "Full Address"],
//               ["city", "City"],
//               ["contactPersonName", "Contact Person Name"],
//               ["contactPersonNo", "Contact Person No"],
//               ["emailId", "Email ID"],
//               [
//                 "bankName",
//                 "Bank Name",
//                 "select",
//                 bankList.map((b) => ({ val: b.name, label: b.name })),
//               ],
//               ["bankAccountNo", "Bank A/c No"],
//               ["ifscCode", "IFSC Code"],
//             ].map(([name, label, type, options]) => (
//               <div key={name}>
//                 <label className="block font-medium text-gray-700 mb-1">
//                   {label}
//                 </label>
//                 {type === "select" ? (
//                   <select
//                     name={name}
//                     onChange={handleInputChange}
//                     className="w-full border px-3 py-1.5 rounded"
//                   >
//                     <option value="">Select {label}</option>
//                     {options.map((opt, idx) => (
//                       <option key={idx} value={opt.val}>
//                         {opt.label}
//                       </option>
//                     ))}
//                   </select>
//                 ) : (
//                   <input
//                     type="text"
//                     name={name}
//                     onChange={handleInputChange}
//                     className="w-full border px-3 py-1.5 rounded"
//                   />
//                 )}
//               </div>
//             ))}
//           </div>

//           {/** Right Column Fields */}
//           <div className="space-y-4">
//             {[
//               ["panNo", "PAN No"],
//               ["gstNo", "GST No"],
//               ["msmeNo", "MSME No"],
//               [
//                 "accountGroup",
//                 "Account Group",
//                 "select",
//                 [
//                   {
//                     val: "Sundry Creditors",
//                     label: "Trade Payable (Supplier)",
//                   },
//                   {
//                     val: "Sundry Debtors",
//                     label: "Trade Payable (Contractor)",
//                   },
//                   { val: "Transporter", label: "Trade Payable (Transporter)" },
//                 ],
//               ],
//               [
//                 "gstState",
//                 "GST State",
//                 "select",
//                 [
//                   "Andman and Nicobar Islands",
//                   "Chhattisgarh",
//                   "Maharashtra",
//                   "Delhi",
//                   "Dadra and Nagar Haceli and Daman and Diu",
//                   "Karnataka",
//                   "Assam",
//                   "Bihar",
//                   "Chandigarh",
//                   "Chhattisgarh",
//                   "Delhi",
//                   "Goa",
//                   "Gujarat",
//                   "Haryana",
//                   "Jharkhand",
//                   "Jammu and Kashmir",
//                   "Karnataka",
//                   "Kerala",
//                   "Ladakh",
//                   "Lakshadweep",
//                   "Maharashtra",
//                   "Manipur",
//                   "Meghalaya",
//                   "Mizoram",
//                   "Nagaland",
//                   "Odisha",
//                   "pondicherry",
//                   "Punjab",
//                   "Rajasthan",
//                   "Sikkim",
//                   "Telangana",
//                   "Tripura",
//                   "Uttarakhand",
//                   "Andhra Pradesh",
//                   "Arunachal Pradesh",
//                   "Himachal Pradesh",
//                   "Madhya Pradesh",
//                   "Tamil Nadu",
//                   "Utter Pradesh",
//                   "West Bengal",
//                 ].map((s) => ({ val: s, label: s })),
//               ],
//               [
//                 "tds",
//                 "TDS",
//                 "select",
//                 [
//                   "194-Q",
//                   "194-I",
//                   "194-H",

//                   ,
//                   "194-C",
//                   "194-JA",
//                   "194-A",
//                   "194-JB",
//                   "194-I",
//                   "194-B",
//                   "194-Q+194-C",
//                   "Not Applicable",
//                 ].map((s) => ({
//                   val: s,
//                   label: s,
//                 })),
//               ],

//               [
//                 "msme",
//                 "MSME",
//                 "select",
//                 [
//                   { val: "YES", label: "YES" },
//                   { val: "NO", label: "NO" },
//                 ],
//               ],
//               [
//                 "msmeType",
//                 "MSME Type",
//                 "select",
//                 [
//                   { val: "Type A", label: "Type A" },
//                   { val: "Type B", label: "Type B" },
//                   { val: "Type C", label: "Type C" },
//                 ],
//               ],
//             ].map(([name, label, typ, options]) => {
//               if (name === "msmeType" && formData.msme !== "YES") return null;
//               return (
//                 <div key={name}>
//                   <label className="block font-medium text-gray-700 mb-1">
//                     {label}
//                   </label>
//                   {typ === "select" ? (
//                     <select
//                       name={name}
//                       onChange={handleInputChange}
//                       className="w-full border px-3 py-1.5 rounded"
//                     >
//                       <option value="">Select {label}</option>
//                       {options.map((opt, idx) => (
//                         <option key={idx} value={opt.val}>
//                           {opt.label}
//                         </option>
//                       ))}
//                     </select>
//                   ) : (
//                     <input
//                       type="text"
//                       name={name}
//                       onChange={handleInputChange}
//                       className="w-full border px-3 py-1.5 rounded"
//                     />
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//           {/** File Upload Section */}
//           <div className="col-span-2 grid grid-cols-2 gap-6 mt-2">
//             {[
//               "gstCertificate",
//               "panCard",
//               "cancelledCheque",
//               "msmeAttachment",
//             ].map((field) => (
//               <div key={field}>
//                 <label className="block font-medium text-gray-700 mb-1">
//                   {field.replace(/([A-Z])/g, " $1").trim()}
//                 </label>
//                 <div className="flex items-center gap-3">
//                   <label
//                     htmlFor={field}
//                     className="bg-blue-600 text-white px-4 py-1 rounded cursor-pointer hover:bg-blue-700"
//                   >
//                     Choose File
//                   </label>
//                   <span className="text-gray-600 text-sm truncate max-w-xs">
//                     {fileNames[field]}
//                   </span>
//                   <input
//                     type="file"
//                     id={field}
//                     name={field}
//                     accept=".pdf,image/*"
//                     onChange={handleInputChange}
//                     className="hidden"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="col-span-2 flex justify-center mt-auto">
//             <button
//               type="submit"
//               className="bg-green-600 px-6 py-2 text-white rounded hover:bg-green-700"
//             >
//               Submit Vendor
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VendorForm;
