import React from 'react'
import { Link } from 'react-router-dom';

const DashboardActions = () => {
    return (
        <div className="dash-buttons">
            <li className="nav_dashboard"><Link to="/edit-profile">
                EDIT PROFILE
            </Link></li>
            {/* <Link to="/add-experience" class="btn btn-light">
                <i class="fab fa-black-tie text-primary"></i>Add Experience
            </Link>
            <Link to="/add-education" class="btn btn-light">
                <i class="fas fa-graduation-cap text-primary"></i>Add Education
            </Link> */}
        </div>
    )
}

export default DashboardActions
