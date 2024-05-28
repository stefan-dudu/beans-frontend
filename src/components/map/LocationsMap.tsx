import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { CoffeeType } from "../../types/Coffee";
var wc = require("which-country");

type LocationsMapProps = {
  data: CoffeeType[] | null; // Define data prop with the appropriate type
};

const LocationsMap: React.FC<LocationsMapProps> = ({ data }) => {
  const [countryCode, setCountryCode] = useState<string[]>([]);
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";
    if (data) {
      const codes: string[] = [];

      data.forEach((el) => {
        el.locations.forEach((loc) => {
          const { coordinates } = loc;

          if (Array.isArray(coordinates)) {
            if (Array.isArray(coordinates[0])) {
              // coordinates is number[][]
              (coordinates as unknown as number[][]).forEach((coord) => {
                if (Array.isArray(coord) && coord.length === 2) {
                  const code = wc([coord[0], coord[1]]);
                  if (code) {
                    codes.push(code);
                  }
                }
              });
            } else if (
              coordinates.length === 2 &&
              typeof coordinates[0] === "number" &&
              typeof coordinates[1] === "number"
            ) {
              // coordinates is number[]
              const code = wc([coordinates[0], coordinates[1]]);
              if (code) {
                codes.push(code);
              }
            }
          }
        });
      });

      setCountryCode(codes);
    }
  }, [data]);

  useEffect(() => {
    if (mapContainer.current && countryCode.length > 0) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/stefan01-dev/cle6x947u005b01nojysmi80b",
        center: [0, 43],
        zoom: 1,
        maxZoom: 15,
      });

      const countryCodeFilter = [
        "in",
        "iso_3166_1_alpha_3",
        ...countryCode.filter((code) => code !== null),
      ];

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

      data &&
        data.forEach((el) => {
          el.locations.forEach((loc) => {
            if (loc.description) {
              const coordinates = loc.coordinates;
              let lngLat: [number, number] | null = null;

              if (Array.isArray(coordinates[0])) {
                // Nested coordinates
                const coord = coordinates[0] as number[];
                if (
                  coord.length === 2 &&
                  typeof coord[0] === "number" &&
                  typeof coord[1] === "number"
                ) {
                  lngLat = [coord[0], coord[1]];
                }
              } else if (
                coordinates.length === 2 &&
                typeof coordinates[0] === "number" &&
                typeof coordinates[1] === "number"
              ) {
                // Flat coordinates
                lngLat = [coordinates[0], coordinates[1]];
              }

              if (lngLat) {
                const popup = new mapboxgl.Popup({
                  offset: 30,
                })
                  .setLngLat(lngLat)
                  .setHTML(
                    `<a href="/farms/${el.slug}" style="margin-top:10px;">
                    Click here to find out more about ${el.name}
                  </a>`
                  );

                new mapboxgl.Marker()
                  .setLngLat(lngLat)
                  .setPopup(popup)
                  .addTo(map);
              }
            }
          });
        });

      setTimeout(() => {
        if (data && data.length > 0) {
          const dataWithPins = data.flatMap((el) =>
            el.locations.filter((loc) => loc.description)
          );
          const randomIndex = Math.floor(Math.random() * dataWithPins.length);
          const randomLocation = dataWithPins[randomIndex];
          const coordinates = randomLocation?.coordinates;
          let center: [number, number] = [-74.0060152, 40.7127281]; // Default center

          if (coordinates) {
            if (Array.isArray(coordinates[0])) {
              // Nested coordinates
              const coord = coordinates[0] as number[];
              if (
                coord.length === 2 &&
                typeof coord[0] === "number" &&
                typeof coord[1] === "number"
              ) {
                center = [coord[0], coord[1]];
              }
            } else if (
              coordinates.length === 2 &&
              typeof coordinates[0] === "number" &&
              typeof coordinates[1] === "number"
            ) {
              // Flat coordinates
              center = [coordinates[0], coordinates[1]];
            }
          }

          center &&
            map.flyTo({
              center: center,
              zoom: 2,
              essential: true, // this animation is considered essential with respect to prefers-reduced-motion
            });
        }
      }, 1500);

      return () => map.remove();
    }
  }, [countryCode, data]);

  return (
    <div
      ref={mapContainer}
      style={{
        position: "relative",
        width: "100%",
        height: "70vh",
      }}
    />
  );
};

export default LocationsMap;
