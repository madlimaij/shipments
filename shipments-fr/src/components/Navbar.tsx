import React from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          SHIPMENTS
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto ms-5 mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className={`nav-link ${location.pathname === '/' && 'active'}`}
                aria-current="page"
                href="/"
              >
                Assignment
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  location.pathname === '/shipments' && 'active'
                }`}
                href="/shipments"
              >
                Shipments Table
              </a>
            </li>
          </ul>
{/*           <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
