import { Link } from 'react-router-dom';
import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useState } from 'react'; // Import useState

import { NavbarProps } from './NavbarProps'; // Import the NavbarProps interface
import { Login } from '../pages/Login'; // Import the Login component

export const Navbar: React.FC<NavbarProps> = ({ setShowLogin }) => {
    const [user, loading, error] = useAuthState(auth);

    const handleSignOut = async () => {
        await signOut(auth);
        setShowLogin(false); // Close the login component when signing out
    };

    return (
        <nav className="navbar">
            <div>
                <Link to="/">Home</Link>
                <button onClick={() => setShowLogin(true)}>Login</button>
            </div>
            <div className="user-info">
                {user && (
                    <>
                        {user?.displayName && <p>Hello, {user.displayName}</p>}
                        {user ? <button onClick={handleSignOut}>Sign Out</button> : null}
                    </>
                )}
            </div>
            {/* No need to render Login component here */}
        </nav>
    );
};
