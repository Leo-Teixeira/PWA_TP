// import * as React from "react"
import {MapContainer,Marker, Popup, TileLayer, useMap} from "react-leaflet"
import 'leaflet/dist/leaflet.css';
import "./MapElement.scss"

function LocationMarker({positions, showMarker} : {positions: any, showMarker: boolean}) {
    const map = useMap()
    if (showMarker === true) {
        map.flyTo(positions, map.getZoom())
    }
    return showMarker === false ? null : (
      <Marker position={positions}>
        <Popup>Vous êtes ici</Popup>
      </Marker>
    )
  }


export default function MapElement({latitude, longitude, showMarker} : {latitude: number, longitude: number, showMarker: boolean}) {
    // const positions = React.useState({ latitude: latitude, longitude: longitude })
    // const zoom = React.useState<any>(13)
	return (
		<MapContainer center={[latitude, longitude]} zoom={13} scrollWheelZoom={true}>
			<TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker positions={[latitude, longitude]} showMarker={showMarker} />
		</MapContainer>
	)
}
