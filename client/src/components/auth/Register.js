import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'
import logo from "../../img/logo.png";


const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email:'',
        password:'',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
          register({ name, email, password });
        }
    };

    if (isAuthenticated) {
      return <Redirect to="/dashboard" />
    }

    return (<div className="register register_bg"><Fragment>
      <center><div className="middle">
      <img src={logo} className="minilogo" alt="Logo MicroBloggos" />
        <h1 className="large text-primary">Register</h1>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type='text' placeholder="Name" name="name" value = {name} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value = {email} onChange={e => onChange(e)} />
          <small className="form-text"></small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value = {password}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value = {password2}
            onChange={e => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Validate" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="./login">Sign In</Link>
      </p>
      </div></center></Fragment></div>);
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,

}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register);