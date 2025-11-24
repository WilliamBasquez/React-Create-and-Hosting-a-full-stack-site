import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    async function loginUser(){
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate("/articles");
        } catch(e){
            setErrorMessage(e.message);
        }
    }

    return (
        <>
            <h1>Log in</h1>
            {errorMessage && <p>{errorMessage}</p>}
            <label>Email:
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
            </label>
            <label> Password:
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br />
            </label>
            <button onClick={loginUser}>Log in</button><br />
            <Link to="/create-account">Don't have an account? Create an account here</Link>
        </>
    )
}