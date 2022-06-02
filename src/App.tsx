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

  const [visitedLocations, setVisitedLocations] = useState([
    {
      lat: 0,
      lng: 0,
    },
  ]);

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

  useEffect(() => {
    setVisitedLocations(
      [...visitedLocations].concat({ lat: coords.lat, lng: coords.lng })
    );
  }, [coords]);

  function randomLocation() {
    setRandomCoords({
      lat: Math.random() * (ranges.latMax - ranges.latMin + 1) + ranges.latMin,
      lng: Math.random() * (ranges.lngMax - ranges.lngMin + 1) + ranges.lngMin,
    });
    setZoom(5);
    setCoords(randomCoords);
  }

  function currentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
    setZoom(15);
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
      <h1>Map Project</h1>
      <Map />
      <div className="btns">
        <button onClick={() => randomLocation()}>
          Teleport me to somewhere random
        </button>
        <button onClick={() => currentLocation()}>Bring me back home</button>
      </div>

      <ul>
        {visitedLocations.map((location, index) => (
          <li key={index}>
            Latitude: {location.lat}, Longtitude: {location.lng}
          </li>
        ))}
      </ul>
    </div>
  );
}
