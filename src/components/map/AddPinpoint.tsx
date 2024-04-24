import React, { useEffect, useRef } from "react";
import mapboxgl, { GeoJSONSourceRaw, MapMouseEvent } from "mapbox-gl";

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
      //   const map = new mapboxgl.Map({
      //     container: mapContainer.current,
      //     style: "mapbox://styles/stefan01-dev/cle6x947u005b01nojysmi80b",
      //     center: [-74.0060152, 40.7127281],
      //     zoom: 5,
      //     maxZoom: 15,
      //   });

      //   // Add zoom controls
      //   map.addControl(new mapboxgl.NavigationControl(), "top-left");

      //   map.on("click", (event) => {
      //     const features = map.queryRenderedFeatures(event.point, {
      //       layers: ["chicago-parks"],
      //     });

      //     if (!features.length) {
      //       return;
      //     }

      //     const feature = features[0];

      //     const popup = new mapboxgl.Popup({ offset: [0, -15] })
      //       .setLngLat((feature.geometry as any).coordinates) // Using type assertion
      //       .setHTML(
      //         `<h3>${feature.properties?.title || ""}</h3><p>${
      //           feature.properties?.description || ""
      //         }</p>`
      //       )
      //       .addTo(map);
      //   });

      //   // Add your custom markers and lines here

      //   var map = new mapboxgl.Map({
      //     container: "map",
      //     style: "mapbox://styles/mapbox/streets-v11",
      //     center: [-79.4512, 43.6568],
      //     zoom: 13,
      //   });

      //   add pinpoint
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/stefan01-dev/cle6x947u005b01nojysmi80b",
        center: [-50.489519, -10.677559],
        zoom: 3,
        maxZoom: 15,
      });

      var marker = new mapboxgl.Marker();

      const add_marker = (event: MapMouseEvent) => {
        var coordinates = event.lngLat;
        // console.log("Lng:", coordinates.lng, "Lat:", coordinates.lat);
        marker.setLngLat(coordinates).addTo(map);
        sendDataToParent(coordinates);
      };

      map.addControl(new mapboxgl.NavigationControl(), "top-left");
      map.on("click", add_marker);

      //   search
      //   const map = new mapboxgl.Map({
      //     container: "map",
      //     style: "mapbox://styles/mapbox/streets-v12",
      //     center: [-73.99209, 40.68933],
      //     zoom: 8.8,
      //   });

      //   const searchJS = document.getElementById("search-js");
      //   if (searchJS !== null) {
      //     searchJS.onload = function () {
      //       const searchBox = new MapboxSearchBox();
      //       searchBox.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";
      //       searchBox.options = {
      //         types: "address,poi",
      //         proximity: [-73.99209, 40.68933],
      //       };
      //       searchBox.marker = true;
      //       searchBox.mapboxgl = mapboxgl;
      //       map.addControl(searchBox);
      //     };
      //   } else {
      //     console.error("searchJS element not found!");
      //   }

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
