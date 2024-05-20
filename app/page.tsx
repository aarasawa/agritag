"use client";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import dynamic from 'next/dynamic';
import styles from './page.module.css';

const Map = dynamic(() => import('./components/Map'), {
  ssr: false,
});

Amplify.configure(outputs);

export default function App() {

  return (
    <div className={styles.container}>
      <Map />
      <div className={styles.overlay}>
        <div className={styles.widget} style={{ top: '10%', left: '10%' }}>
          Widget 1
        </div>
        <div className={styles.widget} style={{ top: '30%', left: '50%' }}>
          Widget 2
        </div>
      </div>
    </div>
  );
}
