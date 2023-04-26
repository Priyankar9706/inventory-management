import { Link } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export default function HeaderComponent() {
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;
  const username = authContext.username;

  function logoutButton() {
    authContext.logout();
  }

  return (
    <header className="border-bottom border-light border-5 mb-1 p-2">
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand-lg">
            <div className="navbar-brand ms-2 fs-2 fw-bold text-black">
              Dashboard
            </div>

            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                {isAuthenticated && (
                  <li className="nav-item fs-5">
                    <Link className="nav-link" to={`/welcome/${username}`}>
                      Home
                    </Link>
                  </li>
                )}
              </ul>

              <ul className="navbar-nav">
                {isAuthenticated && (
                  <li className="nav-item fs-5">
                    <Link className="nav-link" to={`/${username}/inventory`}>
                      Inventory
                    </Link>
                  </li>
                )}
              </ul>
              <ul className="navbar-nav">
                {isAuthenticated && (
                  <li className="nav-item fs-5">
                    <Link className="nav-link" to={`/${username}/invoice-generator`}>
                     Generate Invoice
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <ul className="navbar-nav">
              {!isAuthenticated && (
                <li className="nav-item fs-5">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}

                {!isAuthenticated && (
                <li className="nav-item fs-5">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              )}

              {isAuthenticated && (
                <li className="nav-item fs-5">
                  <Link
                    className="nav-link"
                    to="/logout"
                    onClick={logoutButton}
                  >
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
