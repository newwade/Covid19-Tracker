import React from "react";
import { TileLayer } from "react-leaflet";
import { MapContainer } from "react-leaflet";
import "./map.css";
import { showDataOnMap } from "./utils";

function Map1({ color, countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <MapContainer className="leaflet" center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(color, countries, casesType)}
        {console.log(color)}
      </MapContainer>
    </div>
  );
}

export default Map1;
