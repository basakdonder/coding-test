import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./App.css";

export default function App() {
  const [coords, setCoords] = useState({
    lat: 0,
    lng: 0,
  });

  useLoadScript({
    googleMapsApiKey: "",
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  function Map() {
    return (
      <GoogleMap
        zoom={15}
        center={{ lat: coords.lat, lng: coords.lng }}
        mapContainerClassName="map-container"
      >
        <Marker
          title="You're here!"
          position={{ lat: coords.lat, lng: coords.lng }}
        />
      </GoogleMap>
    );
  }

  return <Map />;
}
