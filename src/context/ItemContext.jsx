


import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { io } from "socket.io-client";

// 1. Create the context
const ItemContext = createContext();

// 2. Export the hook
export const useItemContext = () => useContext(ItemContext);

// 3. Provider
export const ItemProvider = ({ children }) => {
  const [tabAlerts, setTabAlerts] = useState({
    items: false,
    vender: false,
    vehcle: false,
    ticket: false,
  });

  const [items, setItems] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [vendors, setVendors] = useState([]);

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // ✅ Remove item
  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item._id !== id));
  };

  // ✅ Update item status
  const updateItemStatusInContext = (id, status) => {
    setItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, status } : item
      )
    );
  };

  const fetchUser = async () => {
    try {
      const res = await fetch(
        "https://backendsystem-a26n.onrender.com/api/me",
        { credentials: "include" }
      );

      if (res.status === 401) {
        setUser(null);
        return;
      }

      const data = await res.json();
      setUser(data);
    } catch (err) {
      console.log(err);
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };


  // ✅ Fetch logged-in user
  useEffect(() => {


    fetchUser();
  }, []);


  // ✅ Socket connection (ONLY data update, no alert logic here)
  useEffect(() => {
    const socket = io("https://backendsystem-a26n.onrender.com", {
      withCredentials: true,
    });

    socket.on("item_added", (newItem) => {
      toast.success(`🎉 New Item Added: ${newItem.siteName}`, {
        position: "top-right",
        autoClose: 3000,
      });

      setItems((prev) => [...prev, newItem]);
    });

    socket.on("ticket_added", (newTicket) => {
      toast.success(`🎉 New Ticket Added: ${newTicket.siteName}`, {
        position: "top-right",
        autoClose: 3000,
      });

      setTickets((prev) => [...prev, newTicket]);
    });

    socket.on("vehicle_added", (newVehicle) => {
      toast.success(`🚗 New Vehicle Added: ${newVehicle.siteName}`, {
        position: "top-right",
        autoClose: 3000,
      });

      setVehicles((prev) => [...prev, newVehicle]);
    });

    socket.on("vendor_added", (vender) => {
      toast.success(`🏢 New Vendor Added: ${vender.siteName}`, {
        position: "top-right",
        autoClose: 3000,
      });

      setVendors((prev) => [...prev, vender]); // ✅ fixed
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // ✅ Auto alert based on pending status (MAIN LOGIC 🔥)
  useEffect(() => {
    setTabAlerts({
      items: items.some(
        (item) => item.status?.toLowerCase() === "pending"
      ),
      vender: vendors.some(
        (v) => v.status?.toLowerCase() === "pending"
      ),
      vehcle: vehicles.some(
        (v) => v.status?.toLowerCase() === "pending"
      ),
      ticket: tickets.some(
        (t) => t.status?.toLowerCase() === "pending"
      ),
    });
  }, [items, vendors, vehicles, tickets]);

  return (
    <ItemContext.Provider
      value={{
        tabAlerts,
        items,
        setItems,
        tickets,
        setTickets,
        vendors,
        setVendors,
        vehicles,
        setVehicles,
        removeItem,
        updateItemStatusInContext,
        user,
        loadingUser,
        fetchUser
      }}
    >
      {children}
      <ToastContainer />
    </ItemContext.Provider>
  );
};