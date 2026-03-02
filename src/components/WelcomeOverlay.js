import React from 'react';

export default function WelcomeOverlay({ visible = true, title = 'Halo!', subtitle = 'Selamat datang di website saya' }) {
  return (
    <div className={`welcome-overlay ${visible ? 'visible' : 'hidden'}`} aria-hidden={!visible}>
      <div className="welcome-content">
        <div className="welcome-badge">💻</div>
        <h1 className="welcome-title">{title}</h1>
        <p className="welcome-sub">{subtitle}</p>
      </div>
    </div>
  );
}
