import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { LoginProps } from './LoginProps'; // Import the LoginProps interface

export const Login: React.FC<LoginProps> = ({ setShowLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Use useEffect to reset the input values and error message when the component mounts or the user switches between login and signup
    useEffect(() => {
        setEmail('');
        setPassword('');
        setError('');
    }, []);

    const handleEmailAndPasswordLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/'); // Redirect to Home Page after successful login
        } catch (error: any) {
            setError('Error logging in');
        }
    };

    const handleEmailAndPasswordSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // You can also save additional user data to your Firestore or Realtime Database here
            navigate('/'); // Redirect to Home Page after successful registration
        } catch (error: any) {
            setError('Error signing up');
        }
    };

    const signInwithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            // console.log(result)
            navigate('/'); // Redirect to Home Page after successful login with Google
        } catch (error: any) {
            if (error === "auth/popup-closed-by-user") {
                // Handle the error or show a message to the user.
                setError('Sign-in popup closed by user.');
            } else {
                setError('Error signing in');
            }
        }
    }

    return (
        <div className='container'>
            <div className='signInClass'>
                <h1>Welcome Back</h1>
                {error && <div className="error">{error}</div>}
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="buttonGroup">
                    <button className="signIn" onClick={handleEmailAndPasswordLogin}>Sign in</button>
                    <button className="signUp" onClick={handleEmailAndPasswordSignUp}>Create new account</button>
                </div>
                <div className="orSeparator">
                    <div>Or</div>
                </div>
                <button className='signInGoogle' onClick={signInwithGoogle}>Sign in with Google</button>
                <button className='closeButton' onClick={() => setShowLogin(false)}>Close</button>
            </div>
        </div>
    );
};
