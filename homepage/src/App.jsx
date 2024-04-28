import React from 'react';
import './App.css';
import logo from './Logo.svg';
import video from './group.mp4';

// Header component
const Header = () => {
  return (
    <header>
      <img src={logo} alt="My Image" className="left-aligned" />
      <h1>MicroSured</h1>
    </header>
  );
};

// Main content component
const MainContent = () => {
  return (
    <main class = 'background-image'>
        <section class = "quote">
          <h3>Step into the future of travel protection with MicroSured. Shield 
            your flights against delays, soaring seamlessly into tomorrow.</h3>
        </section>
        <section class = 'video-container'>
          <video classname = 'video' src={video} width = '600' height = '400' controls = 'control' autoplay="true" />
        </section>
    </main>
  );
};

// Footer component
const Footer = () => {
  return (
    <footer>
      <p>&copy; 2024 MicroSured. All rights reserved.</p>
    </footer>
  );
};

// App component combining header, main content, and footer
const App = () => {
  return (
    <div className="App">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

export default App;