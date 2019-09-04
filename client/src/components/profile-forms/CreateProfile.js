import React, { Fragment, useState } from 'react';
import { Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile'


const CreateProfile = ({ createProfile, history }) => {
    const [formData, setFormData ] = useState({
        firstname: '',
        lastname: '',
        age: '',
        website: '',
        location: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: ''
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    const {
    firstname,
    lastname,
    age,
    website,
    location,
    bio,
    twitter,
    facebook,
    linkedin
    } = formData;

    const onChange = e =>
     setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history);
    };

    return (
        <Fragment>
          <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
 
        <div className="form-group">
          <input type="text" placeholder="firstname" name="firstname" value={firstname} onChange={e => onChange(e)}/>
          <small className="form-text">Please enter your National Firstname as state in your Identity card</small>
        </div>

        <div className="form-group">
          <input type="text" placeholder="lastname" name="lastname" value={lastname} onChange={e => onChange(e)}/>
          <small className="form-text">Please enter your National Lastname as state in your Identity card</small>
        </div>
        
        <div className="form-group">
          <input type="text" placeholder="age" name="age" value={age} onChange={e => onChange(e)}/>
          <small className="form-text">Please enter your legal age</small>
        </div> 

        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={website} onChange={e => onChange(e)}/>
          <small className="form-text">Could be your own or a company website</small>
        </div>
        
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)}/>
          <small className="form-text">City & state suggested (eg. Trappes)</small>
        </div>

        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)}></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        { displaySocialInputs && (
            <Fragment>

                <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => onChange(e)}/>
                </div>

                <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)}/>
                </div>

                <div class="form-group social-input">
                <i class="fab fa-linkedin fa-2x"></i>
                <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e => onChange(e)}/>
                </div>
            </Fragment>
        )}

        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
        </Fragment>
    );
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile}) (withRouter(CreateProfile));