import { useItemContext } from "../context/ItemContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

function Itemall() {
  const [loading, setLoading] = useState(true);
  const { items, setItems, user } = useItemContext();
  const [error, setError] = useState(null);
  const [showOnlyPending, setShowOnlyPending] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const socket = io("http://localhost:5000", {
  //     withCredentials: true,
  //   });

  //   socket.on("item_added", (newItem) => {
  //     console.log("New item received via socket:", newItem);
  //     setItems((prevItems) => [newItem, ...prevItems]);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [setItems]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch("https://backendsystem-a26n.onrender.com/item/all", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch items");

        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [setItems]);

  const tab = (item) => {
    if (item.status === "approved") {
      alert("This item has already been approved.");
      return;
    }

    if (user?.role !== "admin") {
      navigate("/dashbord/notauthorized");
      return;
    }

    navigate("/allitems", { state: { item } });
  };

  const sortedItems = [...items]
    .filter((item) => (showOnlyPending ? item.status === "pending" : true))
    .sort((a, b) => {
      const order = { pending: 0, rejected: 1, approved: 2 };
      return (order[a.status] ?? 3) - (order[b.status] ?? 3);
    });

  return (
    <div className="p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <p className="text-gray-600 text-sm sm:text-base">
          Pending Items:{" "}
          <span className="font-semibold">
            {items.filter((item) => item.status === "pending").length}
          </span>
        </p>
        <p className="text-gray-600 text-sm sm:text-base">
          Total Items: <span className="font-semibold">{items.length}</span>
        </p>
        {/* Future toggle for pending only */}
        {/* <button
          onClick={() => setShowOnlyPending((prev) => !prev)}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {showOnlyPending ? "Show All Items" : "Show Pending Only"}
        </button> */}
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">Error: {error}</p>}
      {!loading && !error && sortedItems.length === 0 && (
        <p className="text-center text-gray-500">No items found.</p>
      )}

      {!loading && !error && sortedItems.length > 0 && (
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full border text-xs sm:text-sm text-center ">
            <thead className="bg-slate-800 text-white">
              <tr>
                <th className="p-1 border">TIME</th>
                <th className="p-1 border">Name</th>
                <th className="p-1 border">Group</th>
                <th className="p-1 border">GST</th>
                <th className="p-1 border">HSN Code</th>
                <th className="p-1 border">Parts No</th>
                <th className="p-1 border">Unit</th>
                <th className="p-1 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedItems.map((item, idx) => (
                <tr key={idx} className=" text-slate-800">
                  <td className="p-1 border whitespace-nowrap">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>

                  <td className="p-1 border whitespace-nowrap">
                    {item.itemName}
                  </td>
                  <td className="p-1 border whitespace-nowrap">
                    {item.itemGroup}
                  </td>
                  <td className="p-1 border whitespace-nowrap">{item.gst}</td>
                  <td className="p-1 border whitespace-nowrap">
                    {item.hsnCode}
                  </td>
                  <td className="p-1 border whitespace-nowrap">
                    {item.partsNo}
                  </td>
                  <td className="p-1 border whitespace-nowrap">{item.unit}</td>
                  <td className="p-1 border">
                    <button
                      onClick={() => tab(item)}
                      disabled={item.status === "approved"}
                      className={`px-2 py-1 text-xs sm:text-sm rounded-full text-white transition-colors ${item.status === "approved"
                        ? "bg-green-600 cursor-not-allowed"
                        : item.status === "rejected"
                          ? "bg-red-600"
                          : item.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-slate-800"
                        }`}
                    >
                      {item.status === "approved"
                        ? "✅ Approved"
                        : item.status === "rejected"
                          ? "❌ Rejected"
                          : item.status === "pending"
                            ? "⏳ Pending"
                            : "Action"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Itemall;
