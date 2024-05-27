// src/components/MapComponent.tsx
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

  console.log("data", data);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";
    if (data) {
      const codes = data.map((el) =>
        wc([el.locations[0].coordinates[0], el.locations[0].coordinates[1]])
      );
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
        data
          .filter((el) => el.locations[0].description)
          .forEach((el) => {
            // const popupContentString = ReactDOMServer.renderToString(
            //   <PopupContent slug={el.slug} name={el.name} />
            // );

            const popup = new mapboxgl.Popup({
              offset: 30,
            })
              .setLngLat([
                el?.locations[0].coordinates[0],
                el?.locations[0].coordinates[1],
              ])
              // .setHTML(
              //   `<div style=margin-top:10px>${el.name} by ${el.brand}. Location: ${el.locations[0].description}</div>`
              // )
              // .setHTML(
              //   `<a href="https://www.baristretto.com/farms/${el.slug}" style=margin-top:10px>${el.name} by ${el.brand}. Location: ${el.locations[0].description}</a>`
              // )

              // TODO: URL based on env
              .setHTML(
                `<a href="/farms/${el.slug}" style=margin-top:10px>
                Click here to find out more about ${el.name}
              </a>`
              );
            // .setHTML(popupContentString);

            new mapboxgl.Marker()
              .setLngLat([
                el?.locations[0].coordinates[0],
                el?.locations[0].coordinates[1],
              ])
              .setPopup(popup)
              .addTo(map);
          });

      // bounds.extend(loc.coordinates);

      setTimeout(() => {
        if (data && data.length > 0) {
          const dataWithPins = data.filter((el) => el.locations[0].description);
          const randomIndex = Math.floor(Math.random() * dataWithPins.length);
          const randomLocation = dataWithPins[randomIndex]?.locations[0];
          map.flyTo({
            center: [
              randomLocation?.coordinates[0],
              randomLocation?.coordinates[1],
            ],
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
        // width: "80vw",
        // height: "50%",
        //   minWidth: "65vw",
        width: "100%",
        height: "70vh",
      }}
    />
  );
};

export default LocationsMap;
