import { Link } from "react-router-dom"
import { auth } from "../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth";
export const Navbar = () => {
    const [user, loading, error] = useAuthState(auth);
    const handleSignOut = async () => {
        await signOut(auth);
    };

    return (
        <nav className="navbar">
            <div>
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
            </div>
            <div className="user-info">{
                user && (
                    <>
                        {user?.displayName && <p>Hello, {user.displayName}</p>}
                        {user ? (
                            <button onClick={handleSignOut}>Sign Out</button>
                        ) : (
                            <Link to="/login">Sign in with Google</Link>
                        )}
                    </>
                )}
            </div>
        </nav>
    );
};