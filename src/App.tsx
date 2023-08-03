import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Main } from './pages/Main';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { CreatePost } from './pages/create-post/Createpost';

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/createpost" element={<CreatePost />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;






