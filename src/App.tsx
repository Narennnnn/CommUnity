import './App.css';
import { Main } from './pages/Main';
import { Login } from './pages/Login';
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="App">
            <Router>
                <Navbar setShowLogin={setShowLogin} /> {/* Pass setShowLogin to Navbar */}
                {showLogin && <Login setShowLogin={setShowLogin} />} {/* Render the Login component based on showLogin state */}
                <Routes>
                    <Route path="/" element={<Main />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
