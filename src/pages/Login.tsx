import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export const Login = () => {
    const navigate = useNavigate();

    const signInwithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            // console.log(result)
            navigate("/");
        } catch (error) {
            if (error === "auth/popup-closed-by-user") {
                // Handle the error or show a message to the user.
                console.log("Sign-in popup closed by user.");
            } else {
                console.error("Error signing in:", error);
            }
        }
    }

    return (
        <div className='signInClass'>
            <p>Sign in with Google to continue</p>
            <button onClick={signInwithGoogle}>Sign in with Google</button>
        </div>
    );
}
