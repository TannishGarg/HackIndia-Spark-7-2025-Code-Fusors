
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// We're importing leaflet-routing-machine now that it's installed
import "leaflet-routing-machine";
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
    if (!map.current || (!startLocation && !destination)) return;

    const fetchLocations = async () => {
      const newCoordinates = { ...coordinates };
      
      // Fetch start location coordinates if provided
      if (startLocation && !coordinates.start) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(startLocation)}`
          );
          const data = await response.json();
          
          if (data && data.length > 0) {
            newCoordinates.start = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
          }
        } catch (error) {
          console.error("Error fetching start coordinates:", error);
        }
      }
      
      // Fetch destination coordinates if provided
      if (destination && !coordinates.end) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}`
          );
          const data = await response.json();
          
          if (data && data.length > 0) {
            newCoordinates.end = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
          }
        } catch (error) {
          console.error("Error fetching destination coordinates:", error);
        }
      }
      
      setCoordinates(newCoordinates);
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
      L.marker([coordinates.start[0], coordinates.start[1]])
        .addTo(map.current)
        .bindPopup(`Start: ${startLocation}`);
    }
    
    if (coordinates.end) {
      L.marker([coordinates.end[0], coordinates.end[1]])
        .addTo(map.current)
        .bindPopup(`Destination: ${destination}`);
    }
    
    // If we have both points, fit the map to show both and draw route
    if (coordinates.start && coordinates.end) {
      // Create a bounds object and extend it with both points
      const bounds = L.latLngBounds(
        [coordinates.start[0], coordinates.start[1]],
        [coordinates.end[0], coordinates.end[1]]
      );
      
      map.current.fitBounds(bounds, {
        padding: [100, 100],
        maxZoom: 12
      });
      
      // Draw route using OpenRouteService API
      const drawRoute = async () => {
        try {
          // Format coordinates for OpenRouteService ([lon, lat] format)
          const routeCoordinates = [
            [coordinates.start[1], coordinates.start[0]],
            [coordinates.end[1], coordinates.end[0]]
          ];
          
          const response = await axios.post('http://localhost:3000/directions', {
            coordinates: routeCoordinates
          });
          
          if (response.data && response.data.features && response.data.features.length > 0) {
            const routeCoords = response.data.features[0].geometry.coordinates;
            
            // Convert to Leaflet format (from [lon, lat] to [lat, lon])
            const latLngs = routeCoords.map((coord: number[]) => [coord[1], coord[0]]);
            
            // Create and add the polyline
            L.polyline(latLngs, {
              color: '#3887be',
              weight: 5,
              opacity: 0.75
            }).addTo(map.current);
          }
        } catch (error) {
          console.error("Error fetching route:", error);
        }
      };
      
      drawRoute();
    } 
    // Otherwise zoom to whichever point we have
    else if (coordinates.start || coordinates.end) {
      const point = coordinates.start || coordinates.end;
      if (point) {
        map.current.setView([point[0], point[1]], 8);
      }
    }
  }, [coordinates, startLocation, destination]);

  return (
    <div className="flex flex-col">
      <div
        ref={mapContainer}
        className={`h-[300px] rounded-lg border ${className}`}
      />
    </div>
  );
};

export default Map;
