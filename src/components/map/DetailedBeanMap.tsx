import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  location: Location[] | undefined;
}

const DetailedBeanMap: React.FC<DetailedBeanMapProps> = ({ location }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [countryCodes, setCountryCodes] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (location && location.length > 0) {
      const codes: string[] = [];

      location.forEach((loc) => {
        const { coordinates } = loc;

        if (Array.isArray(coordinates[0])) {
          // coordinates is number[][]
          (coordinates as number[][]).forEach((coord) => {
            const code = wc([coord[0], coord[1]]);
            if (code) {
              codes.push(code);
            }
          });
        } else if (Array.isArray(coordinates)) {
          // coordinates is number[]
          const code = wc([coordinates[0], coordinates[1]]);
          if (code) {
            codes.push(code);
          }
        }
      });

      setCountryCodes(codes);
    }
  }, [location]);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";
    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/stefan01-dev/cle6x947u005b01nojysmi80b",
        center: [-74.0060152, 40.7127281], // Default center coordinates
        zoom: 1,
        maxZoom: 15,
      });

      map.on("load", () => {
        if (countryCodes.length > 0) {
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
            ...countryCodes,
          ]);
        }
      });

      map.on("click", "country-boundaries", (e) => {
        if (e.features && e.features.length > 0) {
          const feature = e.features[0];
          const isoCode = feature?.properties?.iso_3166_1_alpha_3;
          if (isoCode) {
            navigate(`/country/${isoCode}`, { state: { coord: e?.lngLat } });
          }
        }
      });

      // if (location && location[0]?.description?.length > 0) {
      //   new mapboxgl.Marker().setLngLat([-74.0060152, 40.7127281]).addTo(map);
      // }

      let firstLocation: [number, number] = [-74.0060152, 40.7127281];
      if (location && location[0] && location[0].coordinates) {
        const coordinates = location[0].coordinates;
        if (Array.isArray(coordinates[0])) {
          // coordinates is number[][]
          firstLocation = [
            (coordinates as number[][])[0][0],
            (coordinates as number[][])[0][1],
          ];
        } else if (Array.isArray(coordinates)) {
          // coordinates is number[]
          firstLocation = [
            (coordinates as number[])[0],
            (coordinates as number[])[1],
          ];
        }
      }

      setTimeout(() => {
        location &&
          location[0].coordinates.length > 0 &&
          map.flyTo({
            center: firstLocation,
            zoom: 2,
            essential: true, // this animation is considered essential with respect to prefers-reduced-motion
          });
      }, 1500);
      // console.log(location && location[0].coordinates.length > 0);

      return () => map.remove();
    }
  }, [countryCodes]);

  return location ? <div ref={mapContainer} className="map" /> : null;
};

export default DetailedBeanMap;
