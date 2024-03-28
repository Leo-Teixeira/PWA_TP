import React from "react";
import "./App.css";
import BottomNavigation from "./layout/BottomNavigation/BottomNavigation.tsx";
import { Route, Routes } from "react-router-dom";
import RouteProvider from "./route-provider";
import { TpRoute } from "./core/type/tpRoute";

function App() {
  const mainRoutes = new RouteProvider().getRoutes();

  const getRoutes = (routes: TpRoute[]): JSX.Element[] => {
    return routes.map((prop, key) => {
      return <Route key={key} path={prop.path} element={<prop.component />} />;
    });
  };

  return (
    <>
      <BottomNavigation />
      <Routes>{getRoutes(mainRoutes)}</Routes>
    </>
  );
}

export default App;
