// src/components/MapComponent.tsx
import React, { useEffect, useRef } from "react";
import mapboxgl, { GeoJSONSourceRaw } from "mapbox-gl";
import { CoffeeType } from "../../types/Coffee";

type LocationsMapProps = {
  data: CoffeeType[] | null; // Define data prop with the appropriate type
};

const LocationsMap: React.FC<LocationsMapProps> = ({ data }) => {
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

      // Add zoom controls
      map.addControl(new mapboxgl.NavigationControl(), "top-left");

      // Add your custom markers and lines here
      data &&
        data.forEach((el) => {
          const popup = new mapboxgl.Popup({
            offset: 30,
          })
            .setLngLat([
              el.locations[0].coordinates[0],
              el.locations[0].coordinates[1],
            ])
            .setHTML(
              // `<div className:'test'>Day ${el.locations[0].description}</div>`
              `<div style=margin-top:10px>Day ${el.locations[0].description}</div>`
            )
            .addTo(map);

          new mapboxgl.Marker()
            .setLngLat([
              el.locations[0].coordinates[0],
              el.locations[0].coordinates[1],
            ])
            .setPopup(popup)
            .addTo(map);
        });

      setTimeout(() => {
        if (data && data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          const randomLocation = data[randomIndex].locations[0];
          console.log("randomLocation", randomLocation.description);
          map.flyTo({
            center: [
              randomLocation.coordinates[0],
              randomLocation.coordinates[1],
            ],
            zoom: 2,
            essential: true, // this animation is considered essential with respect to prefers-reduced-motion
          });
        }
      }, 1500);

      // Clean up on unmount
      return () => map.remove();
    }
  }, []);

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
