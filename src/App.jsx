import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminRoute from "./components/AdminRoute"; // assuming you created it

import Main from "./components/Main";
import Dash from "./components/Dash";
import Formm from "./components/Formm";
import VenderForm from "./components/VenderForm";
import VechleForm from "./components/VechleForm";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import TicketForm from "./components/TicketForm";
import Bank from "./components/Bank";
import St from "./components/Unit";
import Repo from "./components/Site";
import Pro from "./components/Pro";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Gst from "./components/Gst";
import Fleet from "./components/Fleet";
import Allitem from "./pages/Allitem";
import Allvendor from "./pages/Allvendor";
import Allvehicle from "./pages/Allvehicle";
import Allticket from "./pages/Allticket";
import Igroup from "./components/Igroup";
import Eboard from "./components/Eboard";
import NotAdminPage from "./components/NotAdminPage";




function App() {
  return (
    <>
      <div className="overflow-auto scrollbar-hide h-screen  ">
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />


            <Route path="allitems" element={<Allitem />} />
            <Route path="allvenders" element={<Allvendor />} />
            <Route path="allvehicle" element={<Allvehicle />} />
            <Route path="allticket" element={<Allticket />} />

            {/* Dashboard with nested routes */}

            <Route path="/dashbord" element={
              <Dash />


            }>
              <ToastContainer position="top-right" autoClose={2000} />
              <Route index element={<Eboard />} />
              <Route
                path="master/bank"
                element={

                  <Bank />

                }
              />
              <Route
                path="master/unit"
                element={

                  <St />

                }
              />
              <Route
                path="master/site"
                element={

                  <Repo />

                }
              />
              <Route
                path="master/profile"
                element={

                  <Pro />

                }
              />
              <Route path="action" element={<Home />} />
              <Route
                path="master/gst"
                element={

                  <Gst />

                }
              />
              <Route
                path="master/fleet"
                element={

                  <Fleet />

                }
              />
              <Route
                path="master/itemgroup"
                element={

                  <Igroup />


                }
              />

              <Route path="entry/item" element={<Formm />} />
              <Route path="entry/vender" element={<VenderForm />} />
              <Route path="entry/vehicle" element={<VechleForm />} />
              <Route path="entry/ticket" element={<TicketForm />} />
              <Route path="notauthorized" element={<NotAdminPage />} />


            </Route>

          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
