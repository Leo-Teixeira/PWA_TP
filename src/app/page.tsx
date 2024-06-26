"use client";

import Image from "next/image";
// import "./index.scss"

export default function Home() {
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
  

  return (
    <div>
    </div>
  );
}
