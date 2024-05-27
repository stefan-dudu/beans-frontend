import React, { useEffect, useRef, useState } from "react";
import mapboxgl, { MapMouseEvent } from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

interface AddPinpointProps {
  sendDataToParent: (data: any) => void;
}

const AddPinpoint: React.FC<AddPinpointProps> = ({ sendDataToParent }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [pins, setPins] = useState<number[][]>([]);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const clearMarkers = () => {
    if (markersRef.current) {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
    }
    setPins([]);
  };

  class CustomControl implements mapboxgl.IControl {
    private map?: mapboxgl.Map;
    private container?: HTMLElement;
    onAdd(map: mapboxgl.Map) {
      this.map = map;
      this.container = document.createElement("div");
      this.container.className = "mapboxgl-ctrl";
      this.container.textContent = "Clear pins";
      this.container.style.padding = "5px";
      this.container.style.backgroundColor = "#fff";
      this.container.style.borderRadius = "5px";
      this.container.style.cursor = "pointer";
      this.container.onclick = clearMarkers;
      return this.container;
    }

    onRemove() {
      if (this.container?.parentNode) {
        this.container.parentNode.removeChild(this.container);
      }
      this.map = undefined;
    }
  }

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";

    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/stefan01-dev/clvkrqjnj010h01o06dep6qix",
        center: [-50.489519, -10.677559],
        zoom: 1,
        maxZoom: 15,
      });

      const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false,
      });

      map.addControl(geocoder);
      map.addControl(new CustomControl(), "top-left");

      const add_marker = (event: MapMouseEvent) => {
        const coordinates = event.lngLat;
        const newMarker = new mapboxgl.Marker()
          .setLngLat([coordinates.lng, coordinates.lat])
          .addTo(map);

        markersRef.current.push(newMarker);
        setPins((prevPins) => [
          ...prevPins,
          [coordinates.lng, coordinates.lat],
        ]);
      };

      map.on("click", add_marker);

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

  useEffect(() => {
    // console.log("sending data to parent");
    // console.log("pins", pins);
    sendDataToParent(pins);
  }, [pins]);

  return (
    <div
      className="mapAddPinpoint"
      style={{ width: "100%", marginTop: "1rem" }}
    >
      <div
        ref={mapContainer}
        style={{
          position: "relative",
          width: "100%",
          height: "50vh",
        }}
        className="map"
      />
    </div>
  );
};

export default AddPinpoint;
