import { Link, NavLink } from "react-router-dom";
import "./header.scss";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { MenuFoldOutlined } from "@ant-design/icons";

const Header = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <header>
      <div className="container">
        <div className="header d-flex align-items-center justify-content-between">
          <div className="logo">
            <Link to="/my-posts">
              {isAuthenticated ? (
                <h1>My Posts</h1>
              ) : (
                <h1>News</h1>
              )}
            </Link>
          </div>
          <div className="header-menu align-items-center gap-4">
            <nav>
              <ul className="menu-items d-flex align-items-center gap-4">
                <li>
                  <NavLink className="menu-item" to="/">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink className="menu-item" to="/posts">
                    All posts
                  </NavLink>
                </li>
                <li>
                  <NavLink className="menu-item" to="/about">
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink className="menu-item" to="/register">
                    Register
                  </NavLink>
                </li>
              </ul>
            </nav>
            <button className="header-btn">
              {isAuthenticated ? (
                <>
                  <Link to="account">Account</Link>
                </>
              ) : (
                <Link to="login">Login</Link>
              )}
            </button>
          </div>
          <button className="offCanvas" onClick={handleShow}>
            <MenuFoldOutlined />
          </button>

          <Offcanvas show={show} onHide={handleClose} backdrop="static">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title></Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <nav>
                <ul className="res-menu-items gap-4">
                  <li>
                    <NavLink className="menu-item" to="/">
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="menu-item" to="/posts">
                      All posts
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="menu-item" to="/about">
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="menu-item" to="/register">
                      Register
                    </NavLink>
                  </li>
                </ul>
              </nav>
              <button className="header-btn">
                {isAuthenticated ? (
                  <>
                    <Link to="account">Account</Link>
                  </>
                ) : (
                  <Link to="login">Login</Link>
                )}
              </button>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      </div>
    </header>
  );
};

export default Header;
