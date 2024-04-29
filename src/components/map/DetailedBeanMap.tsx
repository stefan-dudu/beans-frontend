import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { GeoJSONSourceRaw } from "mapbox-gl";
import "./DetailedBeanMap.scss";
var wc = require("which-country");

interface MovingObject {
  id: number;
  name: string;
  coordinates: number[];
}

interface Location {
  type: string;
  coordinates: number[];
  description: string;
  _id: string;
  id: string;
}

interface DetailedBeanMapProps {
  location: Location[] | undefined;
}

const DetailedBeanMap: React.FC<DetailedBeanMapProps> = ({ location }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [countryCode, setCountryCode] = useState<string>("");

  const lng = (location && location[0]?.coordinates[0]) || -74.0060152;
  const lat = (location && location[0]?.coordinates[1]) || 40.7127281;
  const description = (location && location[0]?.description) || "description";

  useEffect(() => {
    if (location) {
      const code = wc([location[0].coordinates[0], location[0].coordinates[1]]);
      console.log("code", code);
      setCountryCode(code);
    }
  }, [location]);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";
    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/stefan01-dev/cle6x947u005b01nojysmi80b",
        center: [lng, lat],
        zoom: 1,
        maxZoom: 15,
        // interactive: false,
        // scrollZoom: false,
      });

      const countryCodeFilter = ["in", "iso_3166_1_alpha_3", countryCode];

      countryCode &&
        map
          .on("load", function () {
            map
              .addLayer(
                {
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
                },
                "country-label"
              )
              .setFilter("country-boundaries", countryCodeFilter);
          })
          .addControl(new mapboxgl.NavigationControl(), "top-left");

      location &&
        location[0].description &&
        new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

      setTimeout(() => {
        map.flyTo({
          center: [lng, lat],
          zoom: 2,
          essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        });
      }, 1500);

      return () => map.remove();
    }
  }, [countryCode]);

  // display: flex;
  // position: absolute;
  // width: 62%;
  // height: 30%;
  // bottom: 0px;
  // top: 113vw;
  // left: 20vw;

  // console.log("location", location);

  return location ? (
    <div
      ref={mapContainer}
      // style={{
      //   position: "absolute",
      //   // width: "80vw",
      //   // height: "50%",
      //   minWidth: "50vw",
      //   height: "30vh",
      // }}
      className="map"
    />
  ) : null;
};

export default DetailedBeanMap;
