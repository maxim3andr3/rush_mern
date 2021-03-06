import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const CommentForm = ({ postId, addComment }) => {
    const [text, setText] = useState('');

    return (
        <div className="post-form">
        <div className="">
          <h3>Add a comment to this post :</h3>
        </div>
        <form className="form my-1" onSubmit={e => {
            e.preventDefault();
            addComment(postId, { text });
            setText('');
        }}>
          <textarea
            name="text"
            cols="30"
            rows="3"
            placeholder="Create a post"
            value={text}
            onChange={e => setText(e.target.value)}
            maxLength='130'
            required
          ></textarea><br></br>
          <input type="submit" className="btn btn-success" value="Submit" />
        </form>
      </div>
    )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
}

export default connect(null, { addComment })(CommentForm);
