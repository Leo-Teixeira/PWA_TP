'use client'
import React, { useState, useEffect } from 'react';
import BatteryGauge from 'react-battery-gauge';

const BatteryStatus = () => {
  const [batteryState, setBatteryState] = useState({
    level: 0,
    charging: false
  });

  useEffect(() => {
    async function handleBattery(battery: any) {
      setBatteryState({
        level: battery.level,
        charging: battery.charging
      });

      const updateLevel = () => setBatteryState(state => ({ ...state, level: battery.level }));
      const updateCharging = () => setBatteryState(state => ({ ...state, charging: battery.charging }));

      battery.addEventListener('levelchange', updateLevel);
      battery.addEventListener('chargingchange', updateCharging);

      return () => {
        battery.removeEventListener('levelchange', updateLevel);
        battery.removeEventListener('chargingchange', updateCharging);
      };
    }

    if (navigator.getBattery) {
      navigator.getBattery().then(handleBattery);
    }
  }, []);

  return (
    <div>
      <BatteryGauge
        value={batteryState.level * 100}
        charging={batteryState.charging}
        width={200}
        height={200}
      />
      <p>Battery Level: {Math.round(batteryState.level * 100)}%</p>
      <p>{batteryState.charging ? 'Charging' : 'Not Charging'}</p>
    </div>
  );
};

export default BatteryStatus;
