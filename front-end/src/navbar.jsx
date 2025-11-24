import { Link } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useUser from "./useUser.js";

export default function Navbar() {
  const { isLoading, user } = useUser();
  const navigate = useNavigate();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
        {isLoading ? <li>Loading...</li> : (
          <>
            {user && (
              <li>
                <span>Logged as: {user.email}</span>
              </li>
            )}
          </>
        )}
        <li>
          {user ? <button onClick={() => signOut(getAuth())}>Sign Out</button> : <button onClick={() => navigate("/login")}>Sign In</button>}
        </li>
      </ul>
    </nav>
  );
}
