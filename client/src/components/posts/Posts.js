import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import { getPosts } from '../../actions/post';
import PostForm from './PostForm';
import profil from "../../img/profil.png";
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Posts = ({ getPosts, post: { posts, loading },getCurrentProfile, profile: {profile} }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);
    useEffect(() => { getCurrentProfile();}, [getCurrentProfile]);

    return loading && profile === null ? <Spinner /> : (
<Fragment>
        <div  className="container2"><div class="rowdb">
        <div class="columnsleft">
        <div class="picturelayout"><center><img src={profil} className="profilpicture" alt="Profil" /></center>
          <h2><center>{ profile && profile.firstname}</center></h2></div>
          <ul>
            <li className="nav_dashboard"><a href="/dashboard">DASHBOARD</a></li>
            <li className="nav_dashboard"><Link to="/edit-profile">EDIT PROFILE</Link></li>
            <li className="nav_dashboard green"><Link to="/posts">PUBLISH POST</Link></li>
            {/* <li className="nav_dashboard red"><Link to="/" onClick={() => deleteAccount()}>DELETE</Link></li> */}
          </ul>
        </div>
        <div class="columnsright">

            <h1 className="large text-primary">Posts</h1>
            {/* <p className="lead">
                <i className="fas fa-user"></i>Welcome to the community
            </p> */}
            <PostForm></PostForm>
            <div className="posts">
                {posts.map(post => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>

            
      
        </div>
    </div></div>

      
    </Fragment>
    );
};

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    post: state.post,
    profile: state.profile
});

export default connect(mapStateToProps, { getPosts,getCurrentProfile })(Posts);
