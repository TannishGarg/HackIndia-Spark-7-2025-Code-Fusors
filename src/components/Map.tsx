
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Compass } from "lucide-react";

// Fix for marker icons not showing up
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Create custom marker icon
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Set the default icon for all markers
L.Marker.prototype.options.icon = DefaultIcon;

interface MapCoordinates {
  start?: [number, number];
  startQuery?: string;
  end?: [number, number];
  endQuery?: string;
}

interface MapProps {
  startLocation: string;
  destination: string;
  className?: string;
}

const Map = ({ startLocation, destination, className = "" }: MapProps) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [coordinates, setCoordinates] = useState<MapCoordinates>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
    
    setIsLoading(true);
    setError("");
    
    const fetchLocations = async () => {
      const newCoordinates: MapCoordinates = { ...coordinates };
      
      // Fetch start location coordinates if provided and not already fetched
      if (startLocation && (!coordinates.start || coordinates.startQuery !== startLocation)) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(startLocation)}`
          );
          const data = await response.json();
          
          if (data && data.length > 0) {
            newCoordinates.start = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
            newCoordinates.startQuery = startLocation;
          } else {
            console.warn("No results found for start location:", startLocation);
          }
        } catch (error) {
          console.error("Error fetching start coordinates:", error);
          setError("Could not find start location. Please try a different search term.");
        }
      }
      
      // Fetch destination coordinates if provided and not already fetched
      if (destination && (!coordinates.end || coordinates.endQuery !== destination)) {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}`
          );
          const data = await response.json();
          
          if (data && data.length > 0) {
            newCoordinates.end = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
            newCoordinates.endQuery = destination;
          } else {
            console.warn("No results found for destination:", destination);
          }
        } catch (error) {
          console.error("Error fetching destination coordinates:", error);
          setError("Could not find destination. Please try a different search term.");
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
        map.current.removeLayer(layer);
      }
    });
    
    // Add markers for start and destination
    if (coordinates.start) {
      L.marker([coordinates.start[0], coordinates.start[1]], { icon: DefaultIcon })
        .addTo(map.current)
        .bindPopup(`Start: ${startLocation}`);
    }
    
    if (coordinates.end) {
      L.marker([coordinates.end[0], coordinates.end[1]], { icon: DefaultIcon })
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
      
      // Draw a simple line between the two points
      L.polyline([
        [coordinates.start[0], coordinates.start[1]],
        [coordinates.end[0], coordinates.end[1]]
      ], {
        color: '#3887be',
        weight: 5,
        opacity: 0.75
      }).addTo(map.current);
    } else if (coordinates.start || coordinates.end) {
      const point = coordinates.start || coordinates.end;
      if (point) {
        map.current.setView([point[0], point[1]], 8);
      }
    }
  }, [coordinates, startLocation, destination]);

  return (
    <div className="flex flex-col">
      {isLoading && (
        <div className="text-center text-sm text-muted-foreground pb-2">
          Loading map data...
        </div>
      )}
      
      {error && (
        <div className="text-center text-sm text-red-500 pb-2">
          {error}
        </div>
      )}
      
      {!coordinates.end && !isLoading && (
        <div className="flex items-center justify-center bg-gray-100 h-[300px] rounded-lg border">
          <div className="text-center text-muted-foreground">
            <Compass className="h-10 w-10 mb-2 mx-auto" />
            <p>Select a destination to view on the map</p>
          </div>
        </div>
      )}
      
      <div 
        ref={mapContainer}
        className={`h-[300px] rounded-lg border ${className} ${!coordinates.end && !isLoading ? 'hidden' : ''}`}
      />
    </div>
  );
};

export default Map;
