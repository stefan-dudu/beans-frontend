import React, { useEffect, useRef } from "react";
import mapboxgl, { GeoJSONSourceRaw, MapMouseEvent } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

type Props = {};
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

interface AddPinpointProps {
  sendDataToParent: (data: any) => void;
}

const AddPinpoint: React.FC<AddPinpointProps> = ({ sendDataToParent }) => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";

    if (mapContainer.current) {
      //   add pinpoint
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/stefan01-dev/clvkrqjnj010h01o06dep6qix",
        center: [-50.489519, -10.677559],
        zoom: 1,
        maxZoom: 15,
      });

      var marker = new mapboxgl.Marker();

      const add_marker = (event: MapMouseEvent) => {
        var coordinates = event.lngLat;
        // console.log("Lng:", coordinates.lng, "Lat:", coordinates.lat);
        marker.setLngLat(coordinates).addTo(map);
        sendDataToParent(coordinates);
      };

      // map.addControl(new mapboxgl.NavigationControl(), "top-left");
      map.on("click", add_marker);

      const geocoder = new MapboxGeocoder({
        // Initialize the geocoder
        accessToken: mapboxgl.accessToken, // Set the access token
        mapboxgl: mapboxgl, // Set the mapbox-gl instance
        marker: false, // Do not use the default marker
      });

      // Add the geocoder to the map
      map.addControl(geocoder);

      map.on("load", () => {
        map.addSource("single-point", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });
      });

      // Clean up on unmount
      return () => map.remove();
    }
  }, []);

  return (
    <div
      className="mapAddPinpoint"
      style={{ width: "100%", marginTop: "1rem" }}
    >
      <div
        ref={mapContainer}
        style={{
          position: "relative",
          // width: "80vw",
          // height: "50%",
          //   minWidth: "65vw",
          width: "100%",
          height: "50vh",
        }}
        className="map"
      />
    </div>
  );
};

export default AddPinpoint;
