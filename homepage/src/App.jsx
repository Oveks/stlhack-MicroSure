import React from 'react';
import './App.css';
import logo from './Logo.svg';
import video from './group.mp4';
import { useState } from 'react';

// Header component
const Header = () => {
  return (
    <header>
      <img src={logo} alt="My Image" className="left-aligned" />
      <h1>MicroInsured</h1>
    </header>
  );
};

// Main content component
const MainContent = () => {
  const [whichTab, setWhichTab ] = useState(1)
  return ( 
    <main className = 'background-image'>      
    <nav><a onClick={()=>setWhichTab(1)}>Home</a> <a onClick={()=>setWhichTab(2)}>Insurance</a></nav>
        {whichTab == 1 ?
        <div>
          <section className = "quote">
          <h3>Step into the future of travel protection with MicroInsured. Shield 
            your flights against delays, soaring seamlessly into tomorrow.</h3>
          </section>
          <section className = 'video-container'>
          <video className = 'video' src={video} width = '600' height = '400' controls = 'control' autoPlay={true} />
          </section>
        </div>
        :
        <div>
          <section>

          </section>
        </div>
          }
    </main>
  );
};

// Footer component
const Footer = () => {
  return (
    <footer>
      <p>&copy; 2024 MicroInsured. All rights reserved.</p>
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