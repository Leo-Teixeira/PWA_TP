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
    <div className='BatteryGauge'>
      <BatteryGauge
        value={batteryState.level * 100}
        charging={batteryState.charging}
        width={50}
        height={50}
      />
    </div>
  );
};

export default BatteryStatus;
