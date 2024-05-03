"use client";

import Image from "next/image";
// import from "index.scss"
import BottomNavigation from "@/layout/BottomNavigation/BottomNavigation";

export default function Home() {
  if (typeof navigator !== 'undefined' && "serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("/sw.js").then(
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
  

  return (
    <div>
    </div>
  );
}
