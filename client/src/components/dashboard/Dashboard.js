import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import pp from "../../img/profile.png";

const Dashboard = ({
    getCurrentProfile,
    deleteAccount,
    auth: {user},
    profile: {profile,loading}
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return loading && profile === null ? (
    <Spinner />
    ) : (
        <Fragment>
        <div className="row">
        <div className="test_left">
        <Link to="/"><img src={pp} className="pp" /></Link> 
            <div className="other">
                <p> profile </p>
                <p> story </p>
                <p> followers </p>
            </div>
        </div>
        <div className="test_right">
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome { user && user.name}</p>
            {profile !== null ? (
                <Fragment>
                    <DashboardActions />
                </Fragment>
            ) : (
                <Fragment>
                    <p>You have not yet setup a profile, please add some info</p>
                    <Link to='/create-profile' className="btn btn-primary my-1">Create Profile</Link>
                </Fragment>)}
        </div>
        </div>
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
