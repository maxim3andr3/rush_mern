import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
    profile: {
        user: { _id, name, avatar },
        firstname,
        lastname,
        location
    }
}) => {
    return (

<div className="Mid">
        <div className="profile bg-light">
            <img src={avatar} alt="" className="round-img" />
            <div>
                <center><h2>{name} {lastname}</h2></center>
                {/* <p>{firstname} {lastname}</p> */}
                {/* <p className="my-1">{location}</p> */}
                <center><Link to={`/profile/${_id}`} className="btn btn-primary">
                    View profile
                </Link></center>
            </div>
        </div>
    </div>

    )
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem;
