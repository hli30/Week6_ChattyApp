import React from 'react';
import PropTypes from 'prop-types';

export default function NavBar ({onlineUserCount}) {
  console.log('Rendering <NavBar/>');
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
      <p className="navbar-counter">{onlineUserCount} Users Online</p>
    </nav>
  );
}

NavBar.propTypes = {
  onlineUserCount: PropTypes.string
}