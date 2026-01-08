import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import Menu from "./components/Menu/Menu";
import menuData from "./components/Menu/mainmenu.json";
import NotFoundPage from "./pages/NotFoundPage";
import NotificationHandler from "./components/NotificationHandler";
import Footer from "./components/Footer";
import Abstracts from "./pages/Abstracts";
import Committees from "./pages/Committees";
import Sponsors from "./pages/Sponsors";
import Venue from "./pages/Venue";
import Register from "./pages/Register";
import ScProgram from "./pages/ScProgram";
import Packages from "./pages/Packages";
import FirstAnnouncement from "./pages/FirstAnnouncement";
import ScrollImage from "./components/ui/ScrollImage";
import PageHeaderImage from "./components/ui/PageHeaderImage";

function App() {
  return (
    <BrowserRouter basename="/">
      {/* basename="/2024" */}
      <ScrollImage />
      <header>
        {/* Navigation */}
        <Menu
          data={menuData.menu}
          txtColor="text-white text-base"
          hoverColor="text-white bg-accent-color"
          bgColor="bg-main-color"
          accentColor="bg-main-color"
          mobileTxtColor="text-white"
          mobileBgColor="bg-white"
          subMenuHoverColor="hover:bg-accent-color transition-colors duration-300 ease-in-out "
        />
        {/* Notification handler */}
        <NotificationHandler />
      </header>

      {/* Page Header Image - appears on all pages except home 
      <PageHeaderImage />*/}

      <main
        className={`z-52 mt-30 flex flex-col items-center justify-start overflow-hidden md:min-h-screen`}
      >
        {/* Routing */}

        <Routes>
          {/* Redirect from root path to /2024  <Route path="/" element={<Navigate replace to="/2024" />} />*/}
          {/* Define the target route */}
          <Route path="/" element={<HomePage />} />
          <Route path="/abstracts" element={<Abstracts />} />
          <Route path="/committees" element={<Committees />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/venue" element={<Venue />} />
          <Route path="/register" element={<Register />} />
          <Route path="/scprogram" element={<ScProgram />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/first-announcement" element={<FirstAnnouncement />} />
          {/* Catch all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer txtColor="text-white" logoDark={false} />
    </BrowserRouter>
  );
}

export default App;
