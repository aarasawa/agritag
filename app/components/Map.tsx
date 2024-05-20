import { useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWFyYXNhd2EiLCJhIjoiY2x3ZXF2NnVwMW4ydDJrcWtzNWt0anZjYSJ9.MkqwuCtkj7I8CtiTsg-MrA';

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/aarasawa/clwetpmel00go01q1huoqhut1',
      center: [-119.4179, 36.7783], // Center of California
      zoom: 6, // Adjust zoom level as needed
    });

    map.on('load', () => {
      // Set the map bounds to California's coordinates
      const bounds: [number, number, number, number] = [-124.4096, 32.5343, -114.1308, 42.0095];
      map.setMaxBounds(bounds);
      map.fitBounds(bounds, { padding: 20 });
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
};

export default Map;