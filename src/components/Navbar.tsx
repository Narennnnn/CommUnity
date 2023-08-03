import { Link, useLocation } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Navbar: React.FC = () => {
    const location = useLocation(); // Get the current location using useLocation hook
    const isLoginPage = location.pathname === '/login'; // Check if it's the login page
    const [user] = useAuthState(auth);

    const handleSignOut = async () => {
        await auth.signOut();
    };

    return (
        <nav className={`navbar${isLoginPage ? ' login-navbar' : ''}`}>
            <div>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
            </div>
            <div className="user-info">
                {user && (
                    <>
                        {user?.displayName && <p>Hello, {user.displayName}</p>}
                        {user ? <button onClick={handleSignOut}>Sign Out</button> : null}
                    </>
                )}
            </div>
        </nav>
    );
};
