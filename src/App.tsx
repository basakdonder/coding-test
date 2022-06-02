import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import "./App.css";

export default function App() {
  const [coords, setCoords] = useState({
    lat: 0,
    lng: 0,
  });

  const [randomCoords, setRandomCoords] = useState({
    lat: 0,
    lng: 0,
  });

  const [ranges, setRanges] = useState({
    latMin: -90,
    latMax: 90,
    lngMin: -180,
    lngMax: 180,
  });

  const [zoom, setZoom] = useState(15);

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

  function randomLocation() {
    setRandomCoords({
      lat: Math.random() * (ranges.latMax - ranges.latMin + 1) + ranges.latMin,
      lng: Math.random() * (ranges.lngMax - ranges.lngMin + 1) + ranges.lngMin,
    });
    setZoom(5);
    setCoords(randomCoords);
  }

  function Map() {
    return (
      <GoogleMap
        zoom={zoom}
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

  return (
    <div className="App">
      <Map />
      <div className="btns">
        <button onClick={() => randomLocation()}>
          Teleport me to somewhere random
        </button>
        
      </div>
    </div>
  );
}
