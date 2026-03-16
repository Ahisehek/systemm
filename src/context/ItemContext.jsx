import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";

// 1. Create the context
const ItemContext = createContext();

// 2. Export the hook for easy use
export const useItemContext = () => useContext(ItemContext);

// 3. Create the provider component
export const ItemProvider = ({ children }) => {
  
  const [tabAlerts, setTabAlerts] = useState({
  items: false,
  vender: false,
  vehcle: false,
  ticket: false,
});
const setTabAlert = (tabKey, value) => {
  setTabAlerts((prev) => ({ ...prev, [tabKey]: value }));
};

  const [items, setItems] = useState([]);
   const [tickets, setTickets] = useState([]);
   const [vehicles, setVehicles] = useState([]);
   const [vendors, setVendors] = useState([]);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true)

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item._id !== id));
  };

  const updateItemStatusInContext = (id, status) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item._id === id ? { ...item, status } : item))
    );
  };

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/me", {
        credentials: "include",
      });

      if (!res.ok) throw new Error("something went wrong");

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.error("Failed to fetch user:", err.message);
      setUser(null);
    } finally {
      setLoadingUser(false); // ✅ set loading to false regardless of outcome
    }
  };

  fetchUser();
}, []);


  useEffect(() => {
    const socket = io("http://localhost:5000", {
      withCredentials: true,
    });

    socket.on("item_added", (newItem) => {
      toast.success(`🎉 New Item Added: ${newItem.siteName}`, {
        position: "top-right",
        autoClose: 3000,
      });

      // Update items list if you want to reflect immediately in UI
      setItems((prev) => [...prev, newItem]);
    
      setTabAlert("items", true);
    });

    socket.on("ticket_added", (newTicket) => {
      toast.success(`🎉 New Ticket Added: ${newTicket.siteName}`, {
        position: "top-right",
        autoClose: 3000,
      });

      // Update items list if tickets are part of items or a separate state
     setTickets((prev) => [...prev, newTicket]);
    setTabAlert("ticket", true);
    });
     socket.on("vehicle_added", (newVehicle) => {
      toast.success(`🎉 New Ticket Added: ${newVehicle.siteName}`, {     
        position: "top-right",
        autoClose: 3000,
      });

      // Update items list if tickets are part of items or a separate state
     setVehicles((prev) => [...prev, newVehicle]);
    setTabAlert("vehcle", true);
    });

     socket.on("vendor_added", (vender) => {
      toast.success(`🎉 New "vendor Added: ${vender.siteName}`, {
        position: "top-right",
        autoClose: 3000,
      });

      // Update items list if tickets are part of items or a separate state
     setVendors((prev) => [...prev, vendors]);
    setTabAlert("vender", true);
    });

    return () => {
      socket.disconnect();
    };
  },[setItems, setTabAlert]);

  return (
    <ItemContext.Provider
      value={{ tabAlerts,
      setTabAlert, items, setItems, tickets, setTickets,vendors, setVendors,vehicles,setVehicles, removeItem,  updateItemStatusInContext, user ,loadingUser}}
    >
      {children}
      <ToastContainer/>
    </ItemContext.Provider>
  );
};
