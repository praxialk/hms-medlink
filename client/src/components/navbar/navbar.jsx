import React, { useEffect, useState } from 'react';
import './navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext/AuthContext';

const Navbar = ({ isInUserDashboard }) => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, username, setUsername, userType } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const getStoredUsername = () => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
        return storedUsername;
      }
      return null;
    };

    if (username) {
      localStorage.setItem('username', username);
    } else {
      const storedUsername = getStoredUsername();
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
  }, [username, setUsername]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className={`top ${isMobileMenuOpen ? 'open' : ''}`}>
      <div className='topLeft'>
        <h1 className='logo'>
          <Link
            className='homelink'
            to='/'
            onClick={() => setIsMobileMenuOpen(false)}
          >
            MED LINK.
          </Link>
        </h1>
        <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <i className={isMobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </div>
      <div className='topCenter'>
        {isInUserDashboard ? null : (
          <ul className='topList'>
            <li className='topListItem'>
              <Link
                className='navlink'
                to='/'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                HOME
              </Link>
            </li>
            {userType === 'patient' && (
              <li className='topListItem'>
                <Link
                  className='navlink'
                  to='/Contact'
                >
                  CONTACT
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className='topListItem'>
                <Link
                  className='navlink'
                  to='/Services'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  SERVICES
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li className='topListItem'>
                <Link
                  className='navlink'
                  to='/doctors'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  DOCTORS
                </Link>
              </li>
            )}
            {userType === 'patient' && (
              <li className='topListItem'>
                <Link
                  className='navlink'
                  to='/emergency'
                >
                  EMERGENCY
                </Link>
              </li>
            )}
            <li className='topListItem'>
              <Link
                className='navlink'
                to='/about'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ABOUT
              </Link>
            </li>
            <li className='topListItem'>
              <Link
                className='navlink'
                to='/map'
                onClick={() => setIsMobileMenuOpen(false)}
              >
                MAP
              </Link>
            </li>
            {userType === 'doctor' && (
              <li className='topListItem'>
                <Link
                  className='navlink'
                  to='/doc'
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  DoctorPanel
                </Link>
              </li>
            )}
          </ul>
        )}
      </div>
      {isLoggedIn ? (
        <div className='topRight'>
          <ul className='topList'>
            <li className='topListItem'>
              <div className='dropdown'>
                <div
                  className='dropbtn'
                  onClick={toggleDropdown}
                >
                  Welcome, {username}
                </div>
                <div
                  className={`dropdown-content ${dropdownVisible ? 'show' : ''
                    }`}
                >
                  {userType === 'patient' && (
                    <Link to='/User-Dashboard'>
                      <i className='fa-solid fa-table'></i>
                      User Dashboard
                    </Link>
                  )}
                  <div
                    onClick={handleLogout}
                    className='Logout-link'
                  >
                    <i className='fa-solid fa-right-from-bracket'></i>
                    Logout
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      ) : (
        <div className='topRight'>
          <ul className='topList'>
            <li className='topListItem'>
              <Link
                className='navlink'
                to='/login'
              >
                LOGIN
              </Link>
            </li>
            <li className='topListItem'>
              <Link
                className='navlink'
                to='/register'
              >
                REGISTER
              </Link>
            </li>
          </ul>
          <i className='topSearchIcon fas fa-search'></i>
        </div>
      )}
    </div>
  );
};

export default Navbar;
