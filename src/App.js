import React from 'react';
import './App.css';
import HomePage from './components/homepage/HomePage';
import NavBar from './components/navbar/NavBar';

function App() {
    return (
        <div className="App" id="app" >
            <NavBar />
            <HomePage />
        </div>
    );
}

export default App;