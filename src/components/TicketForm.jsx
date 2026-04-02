import React from "react";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

function TicketForm() {
  const navigate = useNavigate();
  //clear the form after submitting
  const clearForm = () => {
    setFormData({
      siteName: "",
      employeeName: "",
      contactNo: "",
      concernType: "",
      description: "",
      attachment: null,
    });

    setError("");

    // Clear the file input manually
    const fileInput = document.querySelector('input[name="attachment"]');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  /* ------fetch data form database-------- */

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

  const [sites, setSites] = useState([]);
  const [formData, setFormData] = useState({
    siteName: "",
    employeeName: "",
    contactNo: "",
    concernType: "",
    description: "",
    attachment: null,
  });

  const [error, setError] = useState("");


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      const allowedTypes = [
        "application/pdf",
        "image/png",
        "image/jpeg",
        "image/jpg",
      ];
      if (
        file &&
        (!allowedTypes.includes(file.type) || file.size > 10 * 1024 * 1024)
      ) {
        setError("File must be PDF or image and less than 10MB.");
        return;
      } else {
        setError("");
      }
      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const response = await fetch("https://backendsystem-a26n.onrender.com/ticket/add", {
        method: "POST",
        body: form,
        credentials: "include",
      });
      if (response.status === 401 || response.status === 403) {
        alert("Please login first!");
        navigate("/");
        return;
      }
      if (response.ok) {
        const result = await response.json();
        console.log("Vehicle saved:", result);
        //alert("Vehicle saved successfully!");
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
    <>
      <div className="p-2">
        <h2 className="text-2xl font-semibold  text-slate-800 bg-white flex justify-center rounded">
          TICKETING EXPRESS
        </h2>
        <div className="w-300 mx-auto text-black   p-6 bg-white rounded shadow max-sm:w-100">
          <form onSubmit={handleSubmit} className="space-y-5  gap-2">
            {/* Site */}
            <div className="grid grid-cols-2 gap-5    max-sm:grid max-sm:grid-cols-1">
              <div>
                <label className="text-gray-700 font-medium mb-1">
                  Site <span className="text-red-500">*</span>
                </label>
                <select
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

              {/* Employee Name */}
              <div>
                <label className="text-gray-700 font-medium mb-1">
                  Employee Name <span className="text-red-500">*</span>
                </label>
                <input

                  type="text"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>

              {/* Contact No */}
              <div>
                <label className="text-gray-700 font-medium mb-1">
                  Contact No <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>

              {/* Concern Type */}
              <div>
                <label className="text-gray-700 font-medium mb-1">
                  Concern Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="concernType"
                  value={formData.concernType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                >
                  <option value="">Select Concern Type</option>
                  <option value="Training & User Id Requirement">
                    Training & User Id Requirement
                  </option>
                  <option value="Purchase Order Correction">
                    Purchase Order Correction
                  </option>
                  <option value="GRN Correction">GRN Correction</option>
                  <option value="Voucher Entry Problem">
                    Voucher Entry Problem
                  </option>
                  <option value="Job Card Peoblem & Correction">
                    Job Card Peoblem & Correction
                  </option>
                  <option value="Voucher Correction">Voucher Correction</option>
                  <option value="Vendor & GST Related Issues">
                    Vendor & GST Related Issues
                  </option>
                  <option value="Item & Unit Conversion Issues">
                    Item & Unit Conversion Issues
                  </option>
                  <option value="Debit\Credit Note Issue">
                    Debit\Credit Note Issue
                  </option>
                  <option value="New Ledger Creation">
                    New Ledger Creation
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="text-gray-700 font-medium mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                ></textarea>
              </div>

              {/* File Upload */}
              <div>
                <label className="text-gray-700 font-medium mb-1">
                  Attachment No. 1
                </label>
                <input
                  type="file"
                  id="attachment"
                  name="attachment"
                  accept=".pdf, image/*"
                  onChange={handleChange}
                  className="hidden"
                />
                <label
                  htmlFor="attachment"
                  className="cursor-pointer bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded"
                >
                  Choose File
                </label>
                <span className="text-gray-600 text-sm truncate max-w-[200px]">
                  {formData.attachment?.name || "No file selected"}
                </span>
                {/* <p className="text-sm text-gray-500">
                Upload 1 file: PDF or image. Max size 10 MB.
              </p> */}
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
            </div>
            {/* Submit */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-slate-800 text-white px-6 py-2 rounded hover:bg-slate-900 transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default TicketForm;
