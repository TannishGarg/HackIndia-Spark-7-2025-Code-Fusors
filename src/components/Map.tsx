
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  startLocation?: string;
  destination?: string;
  className?: string;
}

const Map = ({ startLocation, destination, className }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [coordinates, setCoordinates] = useState<{ start?: [number, number]; end?: [number, number] }>({});

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

  // Search for the locations and update the map when they change
  useEffect(() => {
    if (!map.current || (!startLocation && !destination) || !mapboxToken) return;

    const fetchLocations = async () => {
      const newCoordinates = { ...coordinates };
      
      // Fetch start location coordinates if provided
      if (startLocation && (!coordinates.start || startLocation !== coordinates.start.toString())) {
        try {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
              startLocation
            )}.json?access_token=${mapboxToken}`
          );
          const data = await response.json();
          
          if (data.features && data.features.length > 0) {
            newCoordinates.start = data.features[0].center as [number, number];
          }
        } catch (error) {
          console.error("Error fetching start coordinates:", error);
        }
      }
      
      // Fetch destination coordinates if provided
      if (destination && (!coordinates.end || destination !== coordinates.end.toString())) {
        try {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
              destination
            )}.json?access_token=${mapboxToken}`
          );
          const data = await response.json();
          
          if (data.features && data.features.length > 0) {
            newCoordinates.end = data.features[0].center as [number, number];
          }
        } catch (error) {
          console.error("Error fetching destination coordinates:", error);
        }
      }
      
      setCoordinates(newCoordinates);
    };
    
    fetchLocations();
  }, [startLocation, destination, mapboxToken]);
  
  // Draw route or update markers when coordinates change
  useEffect(() => {
    if (!map.current) return;
    
    // Clear previous markers
    const markers = document.querySelectorAll('.mapboxgl-marker');
    markers.forEach(marker => marker.remove());
    
    // Add markers and fly to appropriate view
    if (coordinates.start) {
      new mapboxgl.Marker({ color: "#3FB1CE" })
        .setLngLat(coordinates.start)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>Start: ${startLocation}</h3>`))
        .addTo(map.current);
    }
    
    if (coordinates.end) {
      new mapboxgl.Marker({ color: "#FF4B4B" })
        .setLngLat(coordinates.end)
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>Destination: ${destination}</h3>`))
        .addTo(map.current);
    }
    
    // If we have both points, fit the map to show both
    if (coordinates.start && coordinates.end) {
      const bounds = new mapboxgl.LngLatBounds()
        .extend(coordinates.start)
        .extend(coordinates.end);
      
      map.current.fitBounds(bounds, {
        padding: 100,
        maxZoom: 12,
        duration: 1000
      });
      
      // Attempt to draw a route if we have both points
      if (mapboxToken) {
        const drawRoute = async () => {
          try {
            const query = await fetch(
              `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates.start[0]},${coordinates.start[1]};${coordinates.end[0]},${coordinates.end[1]}?steps=true&geometries=geojson&access_token=${mapboxToken}`,
              { method: 'GET' }
            );
            const json = await query.json();
            
            if (json.routes && json.routes[0]) {
              const route = json.routes[0];
              const routeGeoJSON = {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: route.geometry.coordinates
                }
              };
              
              // Check if the route layer exists
              if (map.current.getSource('route')) {
                // Update existing source
                (map.current.getSource('route') as mapboxgl.GeoJSONSource).setData(routeGeoJSON as any);
              } else {
                // Add new source and layer
                map.current.addSource('route', {
                  type: 'geojson',
                  data: routeGeoJSON as any
                });
                
                map.current.addLayer({
                  id: 'route',
                  type: 'line',
                  source: 'route',
                  layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                  },
                  paint: {
                    'line-color': '#3887be',
                    'line-width': 5,
                    'line-opacity': 0.75
                  }
                });
              }
            }
          } catch (error) {
            console.error("Error fetching route:", error);
          }
        };
        
        drawRoute();
      }
    } 
    // Otherwise zoom to whichever point we have
    else if (coordinates.start || coordinates.end) {
      const point = coordinates.start || coordinates.end;
      if (point) {
        map.current.flyTo({
          center: point,
          zoom: 8,
          duration: 1000
        });
      }
    }
  }, [coordinates, startLocation, destination, mapboxToken]);

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
