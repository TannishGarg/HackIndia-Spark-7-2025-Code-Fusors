
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  destination?: string;
  className?: string;
}

const Map = ({ destination, className }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [0, 20], // Default to a world view
      zoom: 1.5,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  // Search for the destination and update the map when it changes
  useEffect(() => {
    if (!map.current || !destination || !mapboxToken) return;

    // Use Mapbox Geocoding API to find the coordinates for the destination
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        destination
      )}.json?access_token=${mapboxToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.features && data.features.length > 0) {
          const [lng, lat] = data.features[0].center;
          
          map.current?.flyTo({
            center: [lng, lat],
            zoom: 8,
            essential: true,
          });

          // Add a marker for the destination
          new mapboxgl.Marker({ color: "#FF4B4B" })
            .setLngLat([lng, lat])
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>${destination}</h3>`))
            .addTo(map.current);
        }
      })
      .catch((error) => console.error("Error fetching destination coordinates:", error));
  }, [destination, mapboxToken]);

  return (
    <div className="flex flex-col">
      {!mapboxToken && (
        <div className="mb-4">
          <label htmlFor="mapbox-token" className="block text-sm font-medium mb-1">
            Enter Mapbox Token
          </label>
          <div className="flex gap-2">
            <input
              id="mapbox-token"
              type="text"
              placeholder="Enter your Mapbox public token"
              className="flex-1 px-3 py-2 border rounded-md"
              onChange={(e) => setMapboxToken(e.target.value)}
              value={mapboxToken}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Get your free token at{" "}
            <a
              href="https://mapbox.com"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              mapbox.com
            </a>
          </p>
        </div>
      )}
      <div
        ref={mapContainer}
        className={`h-[300px] rounded-lg border ${className}`}
      />
    </div>
  );
};

export default Map;
