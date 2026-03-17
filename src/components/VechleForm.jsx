import React, { useState, useEffect } from "react";

function VehicleForm() {
  const [sites, setSites] = useState([]);
  const [fleetList, setFleetList] = useState([]);

  const [formData, setFormData] = useState({
    openingDate: "",
    make: "",
    model: "",
    subContractorName: "",
    registrationNo: "",
    siteName: "",
    machineCategory: "",
    assetPics: {
      vehiclePic: null,
      vehicleRcPic: null,
      licencePic: null,
    },
  });

  // ✅ Clear form fields + all file inputs
  const clearForm = () => {
    setFormData({
      openingDate: "",
      make: "",
      model: "",
      subContractorName: "",
      registrationNo: "",
      siteName: "",
      machineCategory: "",
      assetPics: {
        vehiclePic: null,
        vehicleRcPic: null,
        licencePic: null,
      },
    });

    // ✅ Clear all file inputs
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input) => (input.value = ""));
  };

  // ✅ Fetch sites
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

  // ✅ Fetch fleet list
  useEffect(() => {
    const fetchFleets = async () => {
      try {
        const res = await fetch("https://backendsystem-a26n.onrender.com/fleet/fleetlist");
        const data = await res.json();
        setFleetList(data);
      } catch (err) {
        console.error("Failed to fetch fleets:", err);
      }
    };
    fetchFleets();
  }, []);

  // ✅ Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        assetPics: {
          ...prev.assetPics,
          [name]: files[0],
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    // Append non-file fields
    for (const key in formData) {
      if (key !== "assetPics") {
        form.append(key, formData[key]);
      }
    }

    // Append files
    for (const key in formData.assetPics) {
      if (formData.assetPics[key]) {
        form.append(key, formData.assetPics[key]);
      }
    }

    try {
      const response = await fetch("https://backendsystem-a26n.onrender.com/vehicle/add", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Vehicle saved:", result);
        clearForm();
      } else {
        throw new Error("Failed to save vehicle");
      }
    } catch (err) {
      console.error("Error submitting vehicle data:", err);
      alert("Error saving vehicle data");
    }
  };

  return (
    <div className="p-2">
      <h2 className="text-2xl font-semibold text-white bg-gradient-to-r from-slate-200 via-slate-800 to-slate-200 mb-6 flex justify-center">
        VEHICLE DETAILS
      </h2>
      <div className="w-300 mx-auto p-6 bg-white text-black rounded shadow max-sm:w-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Inputs */}
          <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <div>
              <label className="text-gray-700 mb-1 font-medium">Opening Date</label>
              <input
                type="date"
                name="openingDate"
                value={formData.openingDate}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>

            <div>
              <label className="text-gray-700 mb-1 font-medium">Make</label>
              <input
                required
                type="text"
                name="make"
                value={formData.make}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div>
              <label className="text-gray-700 mb-1 font-medium">Model</label>
              <input
                required
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div>
              <label className="text-gray-700 mb-1 font-medium">Sub Contractor Name</label>
              <input
                required
                type="text"
                name="subContractorName"
                value={formData.subContractorName}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-gray-700 mb-1 font-medium">Registration / Serial No</label>
              <input
                required
                type="text"
                name="registrationNo"
                value={formData.registrationNo}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
          </div>

          {/* Selects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-gray-700 mb-1 font-medium">Site Name</label>
              <select
                required
                name="siteName"
                value={formData.siteName}
                onChange={handleChange}
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
              <label className="text-gray-700 mb-1 font-medium">Fleet Category</label>
              <select
                required
                name="machineCategory"
                value={formData.machineCategory}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="">Select a category</option>
                {fleetList.map((fleet, idx) => (
                  <option key={idx} value={fleet.name}>
                    {fleet.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* File Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["vehiclePic", "Vehicle Picture"],
              ["vehicleRcPic", "RC Document"],
              ["licencePic", "Driving Licence"],
            ].map(([field, label]) => (
              <div key={field}>
                <label className="text-gray-700 font-medium mb-1 block">{label}</label>
                <input
                  required

                  type="file"
                  id={field}
                  name={field}
                  onChange={handleChange}
                  className="hidden"
                />
                <label
                  htmlFor={field}
                  className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded inline-block"
                >
                  Choose File
                </label>
                <span className="text-gray-600 text-sm ml-2 truncate max-w-[200px] inline-block align-middle">
                  {formData.assetPics[field]?.name || "No file selected"}
                </span>
              </div>
            ))}
          </div>

          {/* Submit */}
          <div className="pt-4 flex justify-center">
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
}

export default VehicleForm;
