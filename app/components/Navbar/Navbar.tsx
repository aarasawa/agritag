import React, { useState } from 'react';
import styles from './Navbar.module.css'; // Import the CSS module

interface NavbarProps {
  signOut: (() => void) | undefined;
  user: any;
}

const Navbar: React.FC<NavbarProps> = ({
  signOut, 
  user
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleNavbar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${styles.navbar} ${isExpanded ? styles.expanded : ''}`}>
      <div className={styles.hamburger} onClick={toggleNavbar}>
        <div className={`${styles.bar} ${styles.bar1}`}></div>
        <div className={`${styles.bar} ${styles.bar2}`}></div>
        <div className={`${styles.bar} ${styles.bar3}`}></div>
      </div>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
        {user && (
          <li><a href="/" onClick={ signOut }> Sign Out </a></li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
