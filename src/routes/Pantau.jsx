import React from "react";
import { Route, Routes } from "react-router-dom";
import Pantau from "../pages/pantau";
import DetailLaporan from "../pages/pantau/DetailLaporan";

const PantauRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Pantau />} />
      <Route path="/:id" element={<DetailLaporan />} />
    </Routes>
  );
};

export default PantauRoutes;
