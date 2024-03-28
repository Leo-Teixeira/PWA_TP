import React from "react";
import "./App.css";
import BottomNavigation from "./layout/BottomNavigation/BottomNavigation.tsx";
import { Route, Routes } from "react-router-dom";
import RouteProvider from "./route-provider";
import { TpRoute } from "./core/type/tpRoute";

function App() {
  return (
    <>
      <BottomNavigation />
    </>
  )
}

export default App;
