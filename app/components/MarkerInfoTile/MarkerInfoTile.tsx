import React from 'react';
import styles from './MarkerInfoTile.module.css';

interface Marker {
  lng: number;
  lat: number;
  name: string;
}

interface MarkerInfoTileProps {
  marker: Marker | null;
}

const MarkerInfoTile: React.FC<MarkerInfoTileProps> = ({ marker }) => {
  return (
    <div className={styles.tile}>
      <h3>Marker Information</h3>
      {marker ? (
        <ul>
          <li><strong>Name:</strong> {marker.name}</li>
          <li><strong>Longitude:</strong> {marker.lng}</li>
          <li><strong>Latitude:</strong> {marker.lat}</li>
        </ul>
      ) : (
        <p>No marker selected</p>
      )}
    </div>
  );
};

export default MarkerInfoTile;