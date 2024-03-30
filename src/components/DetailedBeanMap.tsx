import React, { useEffect, useRef } from "react";
import mapboxgl, { GeoJSONSourceRaw } from "mapbox-gl";

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

  const movingObjects: MovingObject[] = [
    // Define your moving objects here
  ];

  console.log("location", location?.length);

  const lng = (location && location[0].coordinates[0]) || -74.0060152;
  const lat = (location && location[0].coordinates[1]) || 40.7127281;
  const description = (location && location[0].description) || "description";

  useEffect(() => {
    if (location && location?.length > 0) {
      mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";
      if (mapContainer.current) {
        const map = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/stefan01-dev/cle6x947u005b01nojysmi80b",
          center: [lng, lat],
          zoom: 2,
          maxZoom: 15,
          interactive: false,
          // scrollZoom: false,
        });

        // Add zoom controls
        // map.addControl(new mapboxgl.NavigationControl(), "top-left");

        // Add your custom markers and lines here
        // Create a new marker.
        new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

        // TODO: animation but at the moment not working right
        // map.flyTo({
        //   center: [lng, lat],
        //   essential: true, // this animation is considered essential with respect to prefers-reduced-motion
        // });

        // TODO: to add a bountry around the country to make it stand out

        // new mapboxgl.Popup({ offset: 40 })
        //   .setLngLat([lng, lat])
        //   .setHTML(`<p style="color:black;">${description}</p>`)
        //   .addTo(map);

        // Clean up on unmount

        return () => map.remove();
      }
    }
  }, [location]);

  // display: flex;
  // position: absolute;
  // width: 62%;
  // height: 30%;
  // bottom: 0px;
  // top: 113vw;
  // left: 20vw;

  return (
    <div
      ref={mapContainer}
      style={{ position: "absolute", width: "100%", height: "38%" }}
    />
  );
};

export default DetailedBeanMap;
