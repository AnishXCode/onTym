import React, {useState} from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const auth = getAuth(app);
    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            console.log("User logged in: ", user);
            if(user) {
                toast.success("Logged in successfully", {
                    position: "top-center",
                    autoClose: 3000,
                });
                navigate("/dashboard", {replace: true});
            }
        } catch (error) {
            console.error("Error Logging In: ", error);
            toast.error(error.message, {
                position: "bottom-center"
            });
        } finally {
            setLoading(false);
        }
    }


    return (
    <form> 
        <h1>Login</h1> 
        <div className="form-group">
            <label>Email</label>
            <input 
                type="text" 
                placeholder="Enter your Email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Password</label>
            <input 
                type="password" 
                placeholder="Enter your Password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <div className="form-button-container">
            <button type="submit" className="form-button" onClick={handleLogin} disabled={loading}>Login</button>
        </div>

        <div className="signup-link">
            <p>New here? <Link to="/signup">Register now</Link></p>
        </div>
        
    </form> 
    ) 
} 

export default Login;