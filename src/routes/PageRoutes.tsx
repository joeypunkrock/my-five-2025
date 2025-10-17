import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "../pages/index";

export const PageRoutes: React.FC = () => {
  return (
    <AnimatePresence mode="sync">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default PageRoutes;
