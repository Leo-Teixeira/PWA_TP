"use client"
import {useState, useEffect} from "react"

const OnlineStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
  
    useEffect(() => {
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);
  
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
  
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }, []);
  
    return {
      isOnline,
      whenOnline: (callback :any) => {
        if (isOnline) callback();
      },
      whenOffline: (callback :any) => {
        if (!isOnline) callback();
      }
    };
  };
  
export default OnlineStatus;
