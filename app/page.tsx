"use client";

import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import dynamic from 'next/dynamic';
import Navbar from './components/Navbar/Navbar';
import styles from './page.module.css';

const Map = dynamic(() => import('./components/Map/Map'), {
  ssr: false,
});

Amplify.configure(outputs);

export default function App() {

  return (
    <div className={ styles.container }>
      <Navbar />
      <Map />
    </div>
  );
}
