import { Link } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import headerBg from "../images/bg_3.png"
import "./HeaderComponent.css"
export default function HeaderComponent() {
  const authContext = useAuth();
  const isAuthenticated = authContext.isAuthenticated;
  const username = authContext.username;

  function logoutButton() {
    authContext.logout();
  }

  return (
    <div style={{ backgroundImage: `url(${headerBg})` }}>
    <header className="border-bottom border-light p-2">
      <div className="container" >
        <div className="row">
          <nav className="navbar navbar-expand-lg">
            <div className="navbar-brand ms-2 fs-2 fw-bold navDashboardHeaderColor">
              Dashboard
            </div>

            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                {isAuthenticated && (
                  <li className="nav-item fs-5">
                    <Link className="nav-link onhover navHeaderColor" to={`/welcome/${username}`}>
                      Home
                    </Link>
                  </li>
                )}
              </ul>

              <ul className="navbar-nav">
                {isAuthenticated && (
                  <li className="nav-item fs-5">
                    <Link className="nav-link navHeaderColor"  to={`/${username}/inventory`} >
                      Inventory
                    </Link>
                  </li>
                )}
              </ul>
              <ul className="navbar-nav">
                {isAuthenticated && (
                  <li className="nav-item fs-5">
                    <Link className="nav-link navHeaderColor" to={`/${username}/invoice-generator`} >
                     Generate Invoice
                    </Link>
                  </li>
                )}
              </ul>
              <ul className="navbar-nav">
                {isAuthenticated && (
                  <li className="nav-item fs-5">
                    <Link className="nav-link navHeaderColor" to={`/${username}/invoice-history`}>
                     Invoice History
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <ul className="navbar-nav">
              {!isAuthenticated && (
                <li className="nav-item fs-5">
                  <Link className="nav-link navHeaderColor" to="/login" >
                    Login
                  </Link>
                </li>
              )}

                {!isAuthenticated && (
                <li className="nav-item fs-5">
                  <Link className="nav-link navHeaderColor"  to="/register">
                    Register
                  </Link>
                </li>
              )}

              {isAuthenticated && (
                <li className="nav-item fs-5" >
                  <Link
                    className="nav-link navHeaderColor"
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
    </div>
  );
}
