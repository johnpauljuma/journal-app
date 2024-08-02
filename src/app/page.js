"use client";

import React from 'react';

export default function Home() {
  const styles = {
    landingPage: {
      backgroundImage: "url('/home6.png')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '77vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
      textAlign: 'center',
      position: 'relative', // Ensure overlay is positioned correctly
    },
    overlay: {
      background: 'rgba(0, 0, 0, 0.5)',
      padding: '0px',
      borderRadius: '10px',
      position: 'absolute', // Ensure overlay covers the entire background
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
    content: {
      position: 'relative', // Ensure content is above the overlay
      zIndex: 1,
    },
    heading: {
      fontSize: '3em',
      marginBottom: '0.5em',
    },
    subheading: {
      fontSize: '1.5em',
      marginBottom: '1.5em',
    },
    ctaButton: {
      padding: '10px 20px',
      fontSize: '1em',
      color: '#fff',
      backgroundColor: '#c04b10',
      border: 'none',
      borderRadius: '5px',
      
    },
  };

  return (
    <div style={styles.landingPage}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <h1 style={styles.heading}>Capture Your World</h1>
        <p style={styles.subheading}>Start documenting your thoughts and memories today.</p>
        <button style={styles.ctaButton}><b>Get Started From the Side Menu</b></button>
      </div>
    </div>
  );
}
