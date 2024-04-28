import React from 'react';
import './App.css';

// Header component
const Header = () => {
  return (
    <header>
      <nav>MicroSured</nav>
    </header>
  );
};

// Main content component
const MainContent = () => {
  return (
    <main>
      <section>
        <h3>Step into the future of travel protection with MicroSured. Shield 
          your flights against delays, soaring seamlessly into tomorrow.</h3>
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
      <div className="content-wrapper">
        <div className="left-side">
          <MainContent />
        </div>
        <div className="right-side"></div>
      </div>
      <Footer />
    </div>
  );
};

export default App;