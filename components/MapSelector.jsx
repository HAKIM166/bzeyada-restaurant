"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [28, 45],
  iconAnchor: [14, 45],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function LocationSelector({ setCoords, calcDistance }) {
  useMapEvents({
    click(e) {
      const c = { lat: e.latlng.lat, lng: e.latlng.lng };
      setCoords(c);
      calcDistance(c);
    },
  });
  return null;
}

export default function MapSelector({
  coords,
  setCoords,
  calcDistance,
  center,
}) {
  return (
    <MapContainer
      center={center}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: "350px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <LocationSelector setCoords={setCoords} calcDistance={calcDistance} />

      {coords && <Marker position={[coords.lat, coords.lng]} icon={markerIcon} />}
    </MapContainer>
  );
}
