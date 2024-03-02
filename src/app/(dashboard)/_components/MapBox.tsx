"use client";
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapBox = () => {
  const [map, setMap] = useState<mapboxgl.Map>();

  const mapNode = useRef(null);

  useEffect(() => {
    const node = mapNode.current;
    // if the window object is not found, that means
    // the component is rendered on the server
    // or the dom node is not initialized, then return early
    if (typeof window === "undefined" || node === null) return;

    // otherwise, create a map instance
    const mapboxMap = new mapboxgl.Map({
      container: node,
      accessToken: "pk.eyJ1IjoiYWRpNTI0NyIsImEiOiJjbHQ4a2s1ZzUwbjlmMmxtN2VrNHBscjB5In0.DOGmHchr_G7dLMBRvm4yfw",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [72.8263, 19.0975], // Longitude, Latitude
      zoom: 1,
    });

    setMap(mapboxMap);

    return () => {
      mapboxMap.remove();
    };
  }, []);
  return <div ref={mapNode} style={{ width: "100%", height: "100%" }} />;
};

export default MapBox;
