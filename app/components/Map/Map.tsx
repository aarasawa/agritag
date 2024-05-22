import { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl, { MapboxGeoJSONFeature, GeoJSONSource } from 'mapbox-gl';
import styles from './Map.module.css';
import MarkerInfoTile from '../MarkerInfoTile/MarkerInfoTile';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWFyYXNhd2EiLCJhIjoiY2x3ZXF2NnVwMW4ydDJrcWtzNWt0anZjYSJ9.MkqwuCtkj7I8CtiTsg-MrA';

interface Marker {
  lng: number;
  lat: number;
  name: string;
}

interface PointGeometry {
  type: 'Point';
  coordinates: [number, number];
}

const markers = [
  { lng: -119.4179, lat: 36.7783, name: 'Marker 1' },
  { lng: -119.4179, lat: 36.7783, name: 'Marker 2' },
  { lng: -118.4179, lat: 36.7783, name: 'Marker 3' },
  // Add more markers as needed
];

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/aarasawa/clwetpmel00go01q1huoqhut1',
      center: [-119.4179, 36.7783], // Center of California
      zoom: 6, // Adjust zoom level as needed
    });

    // Add map controls
    const navControl = new mapboxgl.NavigationControl();
    map.addControl(navControl, 'bottom-right');

    const fullScreenControl = new mapboxgl.FullscreenControl();
    map.addControl(fullScreenControl, 'bottom-right');

    const scaleControl = new mapboxgl.ScaleControl({
      maxWidth: 80,
      unit: 'imperial'
    });
    map.addControl(scaleControl, 'bottom-right');

    map.on('load', () => {
      const bounds: [number, number, number, number] = [-124.4096, 32.5343, -114.1308, 42.0095];
      map.setMaxBounds(bounds);
      map.fitBounds(bounds, { padding: 20 });

      // Add a GeoJSON source with clustered markers
      map.addSource('markers', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: markers.map(marker => ({
            type: 'Feature',
            properties: marker,
            geometry: {
              type: 'Point',
              coordinates: [marker.lng, marker.lat]
            } as PointGeometry
          }))
        },
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
      });

      // Add cluster layer
      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'markers',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': '#51bbd6',
          'circle-radius': 20,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff'
        }
      });

      // Add cluster count layer
      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'markers',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      });

      // Add unclustered point layer
      map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'markers',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 10,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#fff'
        }
      });

      // Add click event for clusters
      map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] }) as MapboxGeoJSONFeature[];
        if (!features.length) return;

        const clusterId = features[0].properties?.cluster_id;
        if (clusterId === undefined) return;

        const source = map.getSource('markers') as GeoJSONSource;
        source.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;

          map.easeTo({
            center: (features[0].geometry as PointGeometry).coordinates,
            zoom: zoom
          });
        });
      });

      // Add click event for unclustered points
      map.on('click', 'unclustered-point', (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers: ['unclustered-point'] }) as MapboxGeoJSONFeature[];
        if (!features.length) return;

        const feature = features[0];
        const coordinates = (feature.geometry as PointGeometry).coordinates.slice() as [number, number];
        const { name, lng, lat } = feature.properties as Marker;

        setSelectedMarker({ lng, lat, name });
        console.log("Marker clicked: ", { lng, lat, name });

        // Ensure that if the map is zoomed out such that multiple copies of the point are visible, the popup appears over the copy being clicked on
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(`<h3>${name}</h3><p>${lng}, ${lat}</p>`)
          .addTo(map);
      });

      // Change the cursor to a pointer when the mouse is over the clusters layer
      map.on('mouseenter', 'clusters', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'clusters', () => {
        map.getCanvas().style.cursor = '';
      });
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
      <MarkerInfoTile marker={selectedMarker} />
    </div>
  );
};

export default Map;
