import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import logo from "../../img/logo_title.png";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li className="button">
        <Link to="/profiles">
        <i className="fas fa-users"></i>{ '' }
        <span className="hide-sm"> Members</span>
        </Link>
      </li>
      <li className="button">
        <Link to="/posts">
        <i className="fas fa-clone"></i>{ '' }
        <span className="hide-sm"> Posts</span>
        </Link>
      </li>
      <li className="button">
        <Link to="/dashboard">
          <i className="fas fa-user"></i>{ '' }
          <span className="hide-sm"> Dashboard</span>
        </Link>
      </li>
      <li  className="button">
        <a onClick={ logout } href="#!">
          <i className="fas fa-sign-out-alt"></i>{ '' }
          <span className="hide-sm"> Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li className="button">
        <Link to="/profiles">
        <i className="fas fa-users"></i>{ '' }
        <span className="hide-sm"> Members</span>
        </Link>
      </li>
        <li className="button"><Link to="/register">Register</Link></li>
        <li className="button"><Link to="/login">Login</Link></li>
      </ul>
  );

  return (
    <nav className="navbar bg-dark">
      
      <h1>
      <Link className="title" to="/"><img src={logo} className="logo" alt="Logo MicroBloggos" /></Link>
      </h1>
      { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
    </nav>
    )
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProp = state => ({
  auth: state.auth
});

export default connect(mapStateToProp, { logout })(Navbar);