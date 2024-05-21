import React from 'react';
import styles from './MarkerInfoTile.module.css';

interface Marker {
  lng: number;
  lat: number;
  name: string;
}

interface TileProps {
  marker: Marker | null;
}

const MarkerInfoTile: React.FC<TileProps> = ({ marker }) => {
  if (!marker) {
    return null;
  }

  return (
    <div className={styles.tile}>
      <h3>Marker Information</h3>
      <ul>
        <li><strong>Name:</strong> {marker.name}</li>
        <li><strong>Longitude:</strong> {marker.lng}</li>
        <li><strong>Latitude:</strong> {marker.lat}</li>
      </ul>
    </div>
  );
};

export default MarkerInfoTile;