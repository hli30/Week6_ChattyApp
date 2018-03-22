import React from 'react';

export default function NavBar () {
  console.log('Rendering <NavBar/>');
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">Chatty</a>
    </nav>
  );
}