import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { supabase } from "../../Utils/SuperbaseClient";  // Import your Supabase client

// Custom red icon for markers
const redIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapView = () => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    // Fetch hospital data from Supabase
    async function fetchHospitals() {
      const { data, error } = await supabase
        .from('Hospitals') // Make sure to use the correct table name
        .select('*'); // You can also specify columns like ['name', 'latitude', 'longitude', 'location_link']

      if (error) {
        console.error('Error fetching hospital data:', error);
      } else {
        setHospitals(data); // Set the fetched data into state
      }
    }

    fetchHospitals();
  }, []); // Empty array ensures this runs once when the component mounts

  return (
    <MapContainer
      center={[6.84566, 79.9226]} // Default center (National Hospital of Sri Lanka)
      zoom={10} // Zoom level
      style={{ height: '100vh', width: '100%' }}
      scrollWheelZoom={false} // Disable scroll zoom
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {hospitals.map((hospital, index) => (
        <Marker key={index} position={[hospital.latitude, hospital.longitude]} icon={redIcon}>
          <Tooltip permanent>{hospital.name}</Tooltip>
          <Popup>
            <strong>{hospital.name}</strong>
            <br />
            {hospital.address}
            <br />
            <a
              href={hospital.location_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Google Maps
            </a>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
