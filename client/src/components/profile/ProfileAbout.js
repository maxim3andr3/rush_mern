import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({ profile: {
    bio,
    firstname,
}}) => {
    return (
        <div className="profile-about bg-light p-2">
        {bio && (
            <Fragment>
                <h2 className="text-primary">{ firstname }s bio</h2>
                <p>
                    {bio}
                </p>
            </Fragment>

        )}
          <div className="line"></div>
        </div>
    )
}

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileAbout
