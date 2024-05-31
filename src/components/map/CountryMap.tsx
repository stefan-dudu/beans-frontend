import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "./DetailedBeanMap.scss";
var wc = require("which-country");

interface Location {
  type: string;
  coordinates: number[][] | number[];
  description: string;
  _id: string;
  id: string;
}

interface DetailedBeanMapProps {
  isoCode: string | undefined;
  coord: [number, number];
}

const DetailedBeanMap: React.FC<DetailedBeanMapProps> = ({
  isoCode,
  coord,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";
    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/stefan01-dev/cle6x947u005b01nojysmi80b",
        center: [0, 43],
        zoom: 1,
        maxZoom: 15,
      });

      map.on("load", () => {
        if (isoCode) {
          map.addLayer({
            id: "country-boundaries",
            source: {
              type: "vector",
              url: "mapbox://mapbox.country-boundaries-v1",
            },
            "source-layer": "country_boundaries",
            type: "fill",
            paint: {
              "fill-color": "#006241",
              "fill-opacity": 0.2,
            },
          });
          map.setFilter("country-boundaries", [
            "in",
            "iso_3166_1_alpha_3",
            isoCode,
          ]);
        }
      });

      coord[0] &&
        coord[1] &&
        setTimeout(() => {
          map.flyTo({
            center: coord || [77, 55],
            zoom: 3,
            essential: true, // this animation is considered essential with respect to prefers-reduced-motion
          });
        }, 1500);
      // console.log(location && location[0].coordinates.length > 0);

      return () => map.remove();
    }
  }, [isoCode]);

  return isoCode ? <div ref={mapContainer} className="map" /> : null;
};

export default DetailedBeanMap;
