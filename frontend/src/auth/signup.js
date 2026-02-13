import React, {useState} from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase";
import { getFirestore, doc, setDoc, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
    const auth = getAuth(app);
    const db = getFirestore(app);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSignup(e) {
        setLoading(true);
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            const user = auth.currentUser;
            console.log(user);
            if(user) {
                console.log("Entered ");
                try {
                    const payload = {
                        uid: user.uid,
                        email: user.email,
                        isDisabled: false,
                        firstName: firstName,
                        lastName: lastName,
                        createdAt: Timestamp.fromDate(new Date()),
                    }
                    console.log("payload: ", payload)
                    await setDoc(doc(db, "users", user.uid), payload, { merge: true });
                    console.log("User created successfully");
                    toast.success("User created successfully", {
                        position: "top-center",
                        autoClose: 3000,
                    });
                    navigate("/dashboard", {replace: true});
                } catch (error) {
                    console.error("Error adding user to Firestore: ", error);
                    toast.error(error.message, {
                        position: "bottom-center"
                    });
                }
            }
        } catch (error) {
            console.error("Error Signing Up: ", error);
            toast.error(error.message, {
                position: "bottom-center"
            });
        } finally {
            setLoading(false);
        }
    }
    
    return (
    <form> 
        <h1>Sign Up</h1> 
        <div>  
            <h3>Email</h3>
            <input 
            type="text" 
            placeholder="Enter your Email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div>  
            <h3>First Name</h3>
            <input 
            type="text" 
            placeholder="Enter your First Name"
            className="form-input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            />
        </div>
        <div>  
            <h3>Last Name</h3>
            <input 
            type="text" 
            placeholder="Enter your Last Name"
            className="form-input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            />
        </div>
        <div>
            <h3>Password</h3>
            <input 
            type="password" 
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            />
        </div>
        <div className="form-button-container">
            <button type="submit" className="form-button" onClick={handleSignup} disabled={loading}>Sign Up</button>
        </div>

        <div className="login-link">
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    </form>
    )
}

export default SignUp;