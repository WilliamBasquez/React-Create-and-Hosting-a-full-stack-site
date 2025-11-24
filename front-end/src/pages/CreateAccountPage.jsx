import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"

export default function CreateAccountPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    async function createAccount() {
        if (password !== confirmedPassword) {
            setErrorMessage("Password and Confirm Password do not match.");
            return;
        }
        try {
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate("/articles");
        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    return (
        <>
            <h1>Create An Account</h1>
            {errorMessage && <p>{errorMessage}</p>}
            <label>Email:
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
            </label>
            <label> Password:
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br />
            </label>
            <label> Confirm Password:
                <input type="password" placeholder="Password" value={confirmedPassword} onChange={e => setConfirmedPassword(e.target.value)} /><br />
            </label>
            <button onClick={createAccount}>Create Account</button><br />
            <Link to="/login">Have an account? Log in here</Link>
        </>
    )
}