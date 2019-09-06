import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import profil from "../../img/profil.png";
import DashboardActions from '../dashboard/DashboardActions';



const EditProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {
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

    const [displaySocialInputs, toggleSocialInputs,] = useState(false);

    useEffect(() => {
        getCurrentProfile();

        setFormData({
            firstname: loading || !profile.firstname ? '' : profile.firstname,
            lastname: loading || !profile.lastname ? '' : profile.lastname,
            age: loading || !profile.age ? '' : profile.age,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social ? '' : profile.social.twitter,
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            linkedin: loading || !profile.social ? '' : profile.social.linkedin,
        })
    }, [loading, getCurrentProfile, profile]);

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
    createProfile(formData, history, true);
    };

    return (
        <Fragment>
                <div  className="container2"><div class="rowdb">
        <div class="columnsleft">
        <div class="picturelayout"><center><img src={profil} className="profilpicture" alt="Profil" /></center>
          <h2><center>{ profile && profile.firstname}</center></h2></div>
          <ul>
            <li className="nav_dashboard"><a href="/dashboard">DASHBOARD</a></li>
            {profile !== null ? (
                <Fragment>
                    <DashboardActions />
                </Fragment>
            ) : (
                <Fragment>
                    <li className="nav_dashboard"><Link to='/create-profile'>CREATE PROFILE</Link></li>
                </Fragment>)}

            {/* <li className="nav_dashboard"><Link to="/">EDIT PROFILE</Link></li> */}
            <li className="nav_dashboard red"><Link to="/">DELETE</Link></li>
          </ul>
        </div>
        <div class="columnsright">
          <h2>Edit Your Profile</h2>
          <small>* required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
 
        <table>
        <tr>
          <td>
          <small className="form-text">Firstname</small>
            <input type="text" placeholder="firstname" name="firstname" value={firstname} onChange={e => onChange(e)}/> 
          </td>
          <td>
          <small className="form-text">Lastname</small>
            <input type="text" placeholder="lastname" name="lastname" value={lastname} onChange={e => onChange(e)}/>
          </td>
        </tr>
        <tr>
          <td>
            <small className="form-text">City</small>
            <input type="text" placeholder="Location" name="location" value={location} onChange={e => onChange(e)}/>
          </td>
          <td>
            <small className="form-text">Age</small>
            <input type="text" placeholder="age" name="age" value={age} onChange={e => onChange(e)}/>
          </td>
        </tr>
        <tr>
          <td COLSPAN="2">
            <small className="form-text">My website</small>
            <input type="text" placeholder="Website" name="website" value={website} onChange={e => onChange(e)}/>
          </td>
        </tr>
        <tr>
          <td COLSPAN="2">
          <small className="form-text">My description</small> 
          <textarea placeholder="A short bio of yourself" name="bio" rows="5" cols="23" value={bio} onChange={e => onChange(e)}></textarea>
          </td>
        </tr>
      </table>

        <div className="my-2">
          <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>(Optional)</span>
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

                <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e => onChange(e)}/>
                </div>
            </Fragment>
        )}
        
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
        <input type="submit" className="btn btn-primary my-1" />
        
      </form>
        </div>
    </div></div>

      
    </Fragment>
    );
};

EditProfile.propTypes = {
    editProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(
    mapStateToProps,
    { createProfile, getCurrentProfile}) (withRouter(EditProfile));