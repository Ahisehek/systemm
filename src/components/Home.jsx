import React from "react";
import { useState, useEffect } from "react";
import { useItemContext } from "@/context/ItemContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Itemall from "@/tabs/Itemall";
import Venderall from "@/tabs/Venderall";
import Vehicleall from "@/tabs/Vehicleall";
import Ticketall from "@/tabs/Ticketall";

function Home() {
  const [activeTab, setActiveTab] = useState("items");
  const { tabAlerts, setTabAlert } = useItemContext();

  // On mount, get tab from localStorage
  useEffect(() => {
    const savedTab = localStorage.getItem("activeHomeTab");
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  // When tab changes, save to localStorage
  const handleTabChange = (value) => {
    setActiveTab(value);
    localStorage.setItem("activeHomeTab", value);
  };

  return (
    <div>
      <div className="">

        <div className="w-screen  bg-slate-200   max-sm:px-4  max-sm:overflow-scroll  ">
          <div id="tab   ">
            <Tabs
              value={activeTab}
              onValueChange={handleTabChange}
              className="  p-2 "
            >
              <TabsList className="bg-white w-full text-slate-800  ">
                <TabsTrigger
                  value="items"
                  className="data-[state=active]:bg-gradient-to-r from-white via-slate-800 to-white data-[state=active]:text-white"
                >
                  Item
                  {tabAlerts.items && (
                    <span className="ml-2 text-yellow-500 animate-pulse text-lg">
                      🔔
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="vender"
                  className="data-[state=active]:bg-gradient-to-r from-white via-slate-800 to-white data-[state=active]:text-white"
                >
                  Vender
                  {tabAlerts.vender && (
                    <span className="ml-2 text-yellow-500 animate-pulse text-lg">
                      🔔
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="vehcle"
                  className="data-[state=active]:bg-gradient-to-r from-white via-slate-800 to-white data-[state=active]:text-white"
                >
                  Vehcle
                  {tabAlerts.vehcle && (
                    <span className="ml-2 text-yellow-500 animate-pulse text-lg">
                      🔔
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="ticket"
                  className="data-[state=active]:bg-gradient-to-r from-white via-slate-800 to-white data-[state=active]:text-white"
                >
                  Ticket
                  {tabAlerts.ticket && (
                    <span className="ml-2 text-yellow-500 animate-pulse text-lg">
                      🔔
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="items">
                <Itemall />
              </TabsContent>

              <TabsContent value="vender">
                <Venderall />
              </TabsContent>
              <TabsContent value="vehcle">
                <Vehicleall />
              </TabsContent>
              <TabsContent value="ticket">
                <Ticketall />
              </TabsContent>
              {/* <TabsContent value="password">
                Change your password here.
              </TabsContent> */}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
