import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import pp from "../../img/profile.png";
import profil from "../../img/profil.png";

const Dashboard = ({
    getCurrentProfile,
    deleteAccount,
    auth: {user},
    profile: {profile,loading}
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return loading && profile === null ? (
    <Spinner />
    ) : (
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
            <li className="nav_dashboard red"><Link to="/" onClick={() => deleteAccount()}>DELETE</Link></li>
          </ul>
        </div>
        <div class="columnsright">
          <h1 className="large text-primary">{ user && user.name}'s Dashboard</h1>
            <p>Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, 




            </p>
            
      
        </div>
    </div></div>

      
    </Fragment>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
