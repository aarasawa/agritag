import { useEffect, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWFyYXNhd2EiLCJhIjoiY2x3ZXF2NnVwMW4ydDJrcWtzNWt0anZjYSJ9.MkqwuCtkj7I8CtiTsg-MrA';

interface Marker {
  lng: number;
  lat: number;
  name: string;
}

const markers = [
  { lng: -119.4179, lat: 36.7783, name: 'Marker 1' },
  { lng: -119.4179, lat: 36.7783, name: 'Marker 2' },
  { lng: -118.4179, lat: 35.7783, name: 'Marker 3' },
  // Add more markers as needed
];

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
      const bounds: [number, number, number, number] = [-124.4096, 32.5343, -114.1308, 42.0095];
      map.setMaxBounds(bounds);
      map.fitBounds(bounds, { padding: 20 });

      // Group markers by coordinates
      const markerGroups: { [key: string]: Marker[] } = markers.reduce((groups, marker) => {
        const key = `${marker.lng},${marker.lat}`;
        if (!groups[key]) {
          groups[key] = [];
        }
        groups[key].push(marker);
        return groups;
      }, {} as { [key: string]: Marker[] });

      // Add grouped markers to the map
      Object.keys(markerGroups).forEach(key => {
        const [lng, lat] = key.split(',').map(Number);
        const group = markerGroups[key];
        
        const popupContent = `
          <div>
            <h3>Markers at this location:</h3>
            <ul>
              ${group.map(marker => `<li>${marker.name}</li>`).join('')}
            </ul>
          </div>
        `;

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupContent);

        new mapboxgl.Marker()
          .setLngLat([lng, lat])
          .setPopup(popup)
          .addTo(map);
      });
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />;
};

export default Map;