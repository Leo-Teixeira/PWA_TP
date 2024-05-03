"use client"
import {useState, useEffect} from "react"

const getOnLineStatus = () => typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean' ? navigator.onLine : true;

const OnlineStatus = () => {
	const [isOnline, setOnline] = useState<boolean | null>(getOnLineStatus())

	useEffect(() => {
		const handleOnline = () => setOnline(true)
		const handleOffline = () => setOnline(false)

		window.addEventListener("online", handleOnline)
		window.addEventListener("offline", handleOffline)

		return () => {
			window.removeEventListener("online", handleOnline)
			window.removeEventListener("offline", handleOffline)
		}
	}, [])

	return {
		isOnline
	}
}

export default OnlineStatus
