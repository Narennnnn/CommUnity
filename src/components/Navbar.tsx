import { Link, useLocation } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { UserCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export const Navbar: React.FC = () => {
    const location = useLocation(); // Get the current location using useLocation hook
    const isLoginPage = location.pathname === '/login'; // Check if it's the login page
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const handleSignOut = async () => {
        await auth.signOut();
        navigate("/");
    };

    return (
        <nav className={`navbar${isLoginPage ? ' login-navbar' : ''}`}>
            <div>
                <Link to="/">Home</Link>
                {!user ? <Link to="/login">Login</Link> : <Link to='/createpost'>Create Post</Link>}
            </div>
            <div className="user-info">
                {user && (
                    <>
                        {user?.displayName && <p>{user.displayName}</p>}
                        <UserCircle2 />
                        {user ? <button onClick={handleSignOut}>Sign Out</button> : null}
                    </>
                )}
            </div>
        </nav>
    );
};
