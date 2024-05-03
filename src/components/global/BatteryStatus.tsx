// "use client"
// import {useState, useEffect} from "react"



// const OnlineStatus = () => {
//     const [batteryInfo, setBatteryInfo] = useState({
//         level: undefined,
//         charging: undefined
//       });
    
//       useEffect(() => {
//         async function updateBatteryInfo(battery: { level: any; charging: any; }) {
//           setBatteryInfo({
//             level: battery.level,
//             charging: battery.charging
//           });
    
//           // Listener pour le niveau de batterie
//           window.addEventListener('levelchange', () => {
//             setBatteryInfo(prev => ({ ...prev, level: battery.level }));
//           });
    
//           // Listener pour l'état de charge
//           window.addEventListener('chargingchange', () => {
//             setBatteryInfo(prev => ({ ...prev, charging: battery.charging }));
//           });
//         }
    
//         if ('getBattery' in navigator) {
//           navigator.getBattery().then(updateBatteryInfo);
//         } else {
//           console.log('Battery API not supported on this browser');
//         }
    
//         return () => {
//           // Cleanup listeners if component unmounts
//           if ('getBattery' in navigator) {
//             navigator.getBattery().then(battery => {
//               battery.removeEventListener('levelchange', updateBatteryInfo);
//               battery.removeEventListener('chargingchange', updateBatteryInfo);
//             });
//           }
//         };
//       }, []);
// }

// export default OnlineStatus
