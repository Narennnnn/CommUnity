import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useState, useEffect } from 'react';

export const Login: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [shouldResetForm, setShouldResetForm] = useState(true); // Set initial value to true

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
            await signInWithPopup(auth, provider);
            navigate('/'); // Redirect to Home Page after successful login with Google
        } catch (error: any) {
            if (error === "auth/popup-closed-by-user") {
                // Handle the error or show a message to the user.
                setError('Sign-in popup closed by user.');
            } else {
                setError('Error signing in');
            }
        }
    };

    // Use useEffect to reset the form when the component mounts or when the user navigates away
    useEffect(() => {
        if (shouldResetForm) {
            setEmail('');
            setPassword('');
            setError('');
            setShouldResetForm(false); // Set shouldResetForm to false after resetting the form
        }
    }, [shouldResetForm]);

    // Use useEffect to set shouldResetForm to true when the component unmounts (user navigates away)
    useEffect(() => {
        return () => {
            setShouldResetForm(true);
        };
    }, []);

    return (
        <div className='container'>
            <div className='signInClass'>
                <h1>Welcome Back</h1>
                {error && <div className="error">{error}</div>}
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="buttonGroup">
                    <button className="signIn" onClick={() => { handleEmailAndPasswordLogin(); }}>Sign in</button>
                    <button className="signUp" onClick={() => { handleEmailAndPasswordSignUp(); }}>Create new account</button>
                </div>
                <div className="orSeparator">
                    <div>Or</div>
                </div>
                <button className='signInGoogle' onClick={() => { signInwithGoogle(); }}>Sign in with Google</button>
            </div>
        </div>
    );
};
