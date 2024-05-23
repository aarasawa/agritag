"use client";
import type { AppProps } from 'next/app';
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import dynamic from 'next/dynamic';
import Navbar from './components/Navbar/Navbar';
import styles from './page.module.css';
import { Authenticator } from '@aws-amplify/ui-react';

const Map = dynamic(() => import('./components/Map/Map'), {
  ssr: false,
});

Amplify.configure(outputs);

const App = () => (
  <div className={styles.container}>
    <Authenticator signUpAttributes={['preferred_username']}>
      {({ signOut, user }) => (
        <div className={ styles.container }>
          <Navbar signOut={ signOut } user={ user }/>
          <Map />
        </div>
      )}
    </Authenticator>
  </div>
);

export default App