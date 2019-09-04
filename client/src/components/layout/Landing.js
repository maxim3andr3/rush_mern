import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if(isAuthenticated){
    return <Redirect to='/dashboard' />;
  }

    return (
  <section className="landing">
        <div className="dark-overlay">
        <div className="row">
          <div className="column">
            
              <h1 className="large"><u>MicroBloggos</u></h1>
              <h2 className="large">Welcome to a new<br></br> social network</h2>
              <p className="lead">
              MicroBloggos is a social networking website where users can post comments, share photographs and post links to news or other interesting content on the web, chat live, and watch short-form video. You can even order food on MicroBloggos if that's what you want to do. Shared content can be made publicly accessible, or it can be shared only among a select group of friends or family, or with a single person.
              </p>
            <div className="buttons">
              <Link to="/register" className="btn btn-primary">Register</Link>
              <Link to="/login" className="btn btn-light">Login</Link>
            </div>
          
        </div>
        
        <div className="column">

        </div>
    </div>
  </div>
  </section>
    )
}

Landing.propTypes = {
  isAuthenticated:PropTypes.bool,
}



const mapStateToProps= state =>({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);