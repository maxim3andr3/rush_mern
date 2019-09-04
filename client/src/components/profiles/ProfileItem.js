import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
    profile: {
        // user: { _id, name, avatar },
        firstname,
        lastname,
        location
    }
}) => {
    return (
        <div className="profile bg-light">
            {/* <img src={avatar} alt="" className="round-img" /> */}
            <div>
                {/* <h2>{name}</h2> */}
                <p>{firstname} {lastname}</p>
                <p className="my-1">{location}</p>
                {/* <Link to={`/profile/${_id}`} className="btn btn-primary"> */}
                    View profile
                {/* </Link> */}
            </div>
        </div>
    )
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem;
