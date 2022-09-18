import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/search">
        <h2 className="nav-title">- VinylSwap -</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <>
            <Link className="navLink" to="/search">
              Find Albums
            </Link>

            <Link className="navLink" to="/login">
              Login / Register
            </Link>
          </>
        )}



        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            {/* <Link className="navLink" to="/user">
              Home
            </Link> */}


            <Link className="navLink" to="/search">
              Find Albums
            </Link>

            <Link className="navLink" to="/addInventory">
              Add Inventory
            </Link>

            <Link className="navLink" to="/threads">
              Messages
            </Link>

            <Link className="navLink" to="/userProfile">
              Your Profile
            </Link>

            <LogOutButton className="navLinkLogout" to />
          </>
        )}


      </div>
    </div>
  );
}

export default Nav;
