import React from 'react';

export default function Footer() {
  return (
    <footer className="footer pb-24 relative">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-left">
            <div className="footer-logo">AK.</div>
            <div className="footer-tagline">Building for the web.</div>
          </div>
          
          <div className="footer-right">
            <span>&copy; {new Date().getFullYear()} Avanish Kasar</span>
            <span className="footer-separator">•</span>
            <span>All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
