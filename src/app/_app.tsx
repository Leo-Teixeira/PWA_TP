"use client";

import { BottomNavigation } from "@mui/material";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator && "serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/service.worker.js").then(
          function (registration) {
            console.log(
              "Service Worker registration successful with scope: ",
              registration.scope
            );
          },
          function (err) {
            console.log("Service Worker registration failed: ", err);
          }
        );
      });
    }
  }, []);

    return (
        <BottomNavigation></BottomNavigation>
    );
}
