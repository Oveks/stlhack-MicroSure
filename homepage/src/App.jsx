import './App.css'

import React from 'react';
import './App.css';

// Header component
const Header = () => {
  return (
    <header>
      <h1>Welcome to My Website</h1>
    </header>
  );
};

// Main content component
const MainContent = () => {
  return (
    <main>
      <section>
        <h2>About Us</h2>
        <p>This is a generic webpage built with React.</p>
      </section>
      <section>
        <h2>Services</h2>
        <ul>
          <li>Web Development</li>
          <li>Graphic Design</li>
          <li>Content Creation</li>
        </ul>
      </section>
      <section>
        <h2>Contact Us</h2>
        <p>Email: info@example.com</p>
        <p>Phone: 123-456-7890</p>
      </section>
    </main>
  );
};

// Footer component
const Footer = () => {
  return (
    <footer>
      <p>&copy; 2024 My Website. All rights reserved.</p>
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
