

import React, { useEffect, useState } from "react";

const statusColors = {
  all: "bg-blue-100 text-blue-800",
  approved: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  rejected: "bg-red-100 text-red-800",
};

function Eboard() {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [data, setData] = useState({
    items: [],
    vendors: [],
    vehicles: [],
    tickets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all data
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [itemsRes, vendorsRes, vehiclesRes, ticketsRes] =
          await Promise.all([
            fetch("https://backendsystem-a26n.onrender.com/item/all", { credentials: "include" }),
            fetch("https://backendsystem-a26n.onrender.com/vender/all", {
              credentials: "include",
            }),
            fetch("https://backendsystem-a26n.onrender.com/vehicle/all", {
              credentials: "include",
            }),
            fetch("https://backendsystem-a26n.onrender.com/ticket/all", {
              credentials: "include",
            }),
          ]);

        const [items, vendors, vehicles, tickets] = await Promise.all([
          itemsRes.json(),
          vendorsRes.json(),
          vehiclesRes.json(),
          ticketsRes.json(),
        ]);

        setData({ items, vendors, vehicles, tickets });
        setLoading(false);
      } catch (err) {
        console.log(err);
        //console.error("Failed to fetch data:", err);
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Compute counts per site by status
  const computeSiteCounts = () => {
    const siteMap = {};

    const addToMap = (entries, key) => {
      entries.forEach((entry) => {
        const site = entry.siteName || "Unknown";
        if (selectedStatus !== "all" && entry.status !== selectedStatus) return;

        if (!siteMap[site]) {
          siteMap[site] = {
            siteName: site,
            items: 0,
            vendors: 0,
            vehicles: 0,
            tickets: 0,
          };
        }

        siteMap[site][key]++;
      });
    };

    addToMap(data.items, "items");
    addToMap(data.vendors, "vendors");
    addToMap(data.vehicles, "vehicles");
    addToMap(data.tickets, "tickets");

    return Object.values(siteMap);
  };

  const rows = computeSiteCounts();

  return (
    <div className="p-8  h-100 text-black w-screen  max-sm:px-5 max-sm:w-100 max-sm:p-0">
      <h2 className="text-3xl  flex justify-center font-bold  mb-6 text-white bg-gradient-to-r from-slate-200 via-slate-800 to-slate-200">
        Status Overview
      </h2>

      {/* Status Filter */}
      <div className="flex justify-end items-center gap-4 mb-6">
        <label className="text-lg font-semibold">Filter by Status:</label>
        <select
          value={selectedStatus}
          onChange={(e) => {
            const value = e.target.value;
            if (value !== selectedStatus) {
              setSelectedStatus(value);
            }
          }}
          className={`px-4 py-2 rounded-lg border focus:outline-none transition-all duration-200 ease-in-out ${statusColors[selectedStatus]}`}
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-center text-lg text-gray-500">Loading data...</p>
      ) : error ? (
        <p className="text-center text-lg text-red-600">{error}</p>
      ) : rows.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No data available.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full border text-left  rounded shadow">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="p-2 border">Site</th>
                <th className="p-2 border">Items</th>
                <th className="p-2 border">Vendors</th>
                <th className="p-2 border">Vehicles</th>
                <th className="p-2 border">Tickets</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="bg-white rounded">
                  <td className="p-2 border font-semibold">{row.siteName}</td>
                  <td className="p-2 border text-center">{row.items}</td>
                  <td className="p-2 border text-center">{row.vendors}</td>
                  <td className="p-2 border text-center">{row.vehicles}</td>
                  <td className="p-2 border text-center">{row.tickets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Eboard;
