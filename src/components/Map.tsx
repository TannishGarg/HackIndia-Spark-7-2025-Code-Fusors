import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

interface MapProps {
  startLocation?: string;
  destination?: string;
  className?: string;
}

const Map = ({ startLocation, destination, className }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const [coordinates, setCoordinates] = useState<{ start?: [number, number]; end?: [number, number] }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize the map if it doesn't exist
    if (!map.current) {
      map.current = L.map(mapContainer.current).setView([20, 0], 2);
      
      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map.current);
    }

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Search for the locations and update the map when they change
  useEffect(() => {
    if (!map.current) return;
    if (!startLocation && !destination) return;
    
    setIsLoading(true);
    setError(null);

    const fetchLocations = async () => {
      const newCoordinates = { ...coordinates };
      
      // Fetch start location coordinates if provided
      if (startLocation && (!coordinates.start || coordinates.start.length !== 2)) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(startLocation)}&limit=1`
          );
          const data = await response.json();
          
          if (data && data.length > 0) {
            newCoordinates.start = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
            console.log("Start location found:", newCoordinates.start);
          } else {
            console.warn("Start location not found:", startLocation);
          }
        } catch (error) {
          console.error("Error fetching start coordinates:", error);
          setError("Failed to find start location");
        }
      }
      
      // Fetch destination coordinates if provided
      if (destination && (!coordinates.end || coordinates.end.length !== 2)) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}&limit=1`
          );
          const data = await response.json();
          
          if (data && data.length > 0) {
            newCoordinates.end = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
            console.log("Destination found:", newCoordinates.end);
          } else {
            console.warn("Destination not found:", destination);
          }
        } catch (error) {
          console.error("Error fetching destination coordinates:", error);
          setError("Failed to find destination");
        }
      }
      
      setCoordinates(newCoordinates);
      setIsLoading(false);
    };
    
    fetchLocations();
  }, [startLocation, destination]);
  
  // Draw route or update markers when coordinates change
  useEffect(() => {
    if (!map.current) return;
    
    // Clear previous markers and routes
    map.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polyline) {
        map.current?.removeLayer(layer);
      }
    });
    
    // Add markers for start and destination
    if (coordinates.start) {
      L.marker(coordinates.start)
        .addTo(map.current)
        .bindPopup(`Start: ${startLocation}`);
    }
    
    if (coordinates.end) {
      L.marker(coordinates.end)
        .addTo(map.current)
        .bindPopup(`Destination: ${destination}`);
    }
    
    // If we have both points, fit the map to show both and draw a direct line
    if (coordinates.start && coordinates.end) {
      // Create a bounds object and extend it with both points
      const bounds = L.latLngBounds(
        coordinates.start,
        coordinates.end
      );
      
      map.current.fitBounds(bounds, {
        padding: [100, 100],
        maxZoom: 12
      });
      
      // Draw a simple straight line between points (since we don't have the routing API)
      L.polyline([coordinates.start, coordinates.end], {
        color: '#3887be',
        weight: 5,
        opacity: 0.75,
        dashArray: '10, 10', // Make the line dashed to indicate it's not a real route
      }).addTo(map.current);
    } 
    // Otherwise zoom to whichever point we have
    else if (coordinates.start || coordinates.end) {
      const point = coordinates.start || coordinates.end;
      if (point) {
        map.current.setView(point, 8);
      }
    }
  }, [coordinates, startLocation, destination]);

  return (
    <div className="flex flex-col">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-2 text-sm">
          {error}
        </div>
      )}
      {isLoading && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 rounded mb-2 text-sm">
          Loading map data...
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
