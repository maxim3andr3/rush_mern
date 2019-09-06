import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import { getPost } from '../../actions/post';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import profil from "../../img/profil.png";


const Post = ({ getPost, post: { post, loading }, match }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost, match]);

    return loading || post === null ? (
    <Spinner />
    ) : (
<Fragment>
        <div  className="container2"><div class="rowdb">
        <div class="columnsleft">
        <div class="picturelayout"><center><img src={profil} className="profilpicture" alt="Profil" /></center>
          <h2></h2></div>
          <ul>
            <li className="nav_dashboard"><a href="/dashboard">DASHBOARD</a></li>
            <li className="nav_dashboard"><Link to="/edit-profile">EDIT PROFILE</Link></li>
            <li className="nav_dashboard green"><Link to="/posts">PUBLISH POST</Link></li>
            {/* <li className="nav_dashboard red"><Link to="/" onClick={() => deleteAccount()}>DELETE</Link></li> */}
          </ul>
        </div>
        <div class="columnsright">

        <Link to='/posts' className='btn'>
            Back to posts
        </Link>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <div className="comments">
            {post.comments.map(comment => (
                <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
        </div>

            
      
        </div>
    </div></div>

      
    </Fragment>
    );
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post);
