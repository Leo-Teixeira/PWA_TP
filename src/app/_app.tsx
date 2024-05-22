// import { BottomNavigation } from "@mui/material";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    if (
      typeof navigator !== "undefined" &&
      navigator &&
      "serviceWorker" in navigator &&
      typeof window !== "undefined" && typeof localStorage !== 'undefined' &&
      window
    ) {
      window.addEventListener("load", function () {
        console.log("Service Worker registration successful with scope: ");
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

  return <></>;
}
