import React from 'react';

function CommentInput({ newComment, handleCommentChange, addComment }) {
  return (
    <div>
      <h3>Write your comment:</h3>
      <input 
        type="text" 
        value={newComment} 
        onChange={handleCommentChange} 
      />
      <button onClick={addComment}>Add Comment</button>
    </div>
  );
}

export default CommentInput;
