import './App.css';
import { Main } from './pages/Main';
import { Login } from './pages/Login';
import React from 'react';
import { Navbar } from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
        </div>
    )
}
export default App;