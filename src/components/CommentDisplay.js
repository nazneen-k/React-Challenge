import React, { useState } from 'react';

function CommentDisplay({ comment, setComments }) {
  const [editedText, setEditedText] = useState(comment.text);
  const [isEditing, setIsEditing] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showNestedReplyInput, setShowNestedReplyInput] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setComments((prevComments) =>
      prevComments.map((c) =>
        c.id === comment.id ? { ...c, text: editedText } : c
      )
    );
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedText(comment.text);
  };

  const handleDeleteComment = () => {
    setComments((prevComments) =>
      prevComments.filter((c) => c.id !== comment.id)
    );
  };

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  const handleReply = () => {
    setComments((prevComments) =>
      prevComments.map((c) => {
        if (c.id === comment.id) {
          if (c.replies && c.replies.length > 0) {
            const lastReply = c.replies[c.replies.length - 1];
            const updatedLastReply = {
              ...lastReply,
              replies: [...(lastReply.replies || []), { id: Date.now(), text: replyText }],
            };
            return {
              ...c,
              replies: [...c.replies.slice(0, -1), updatedLastReply],
            };
          }
          return {
            ...c,
            replies: [...(c.replies || []), { id: Date.now(), text: replyText }],
          };
        }
        return c;
      })
    );
    setShowReplyInput(false);
    setReplyText('');
  };

  const handleDeleteReply = (replyId) => {
    setComments((prevComments) =>
      prevComments.map((c) =>
        c.id === comment.id
          ? {
              ...c,
              replies: (c.replies || []).filter((r) => r.id !== replyId),
            }
          : c
      )
    );
  };

  return (
    <div style={{ marginLeft: '20px', borderLeft: '1px solid #ccc', padding: '8px' }}>
      {!isEditing ? (
        <div>
          <p>{comment.text}</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDeleteComment}>Delete</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      )}
      <button onClick={() => setShowReplyInput(!showReplyInput)}>Reply</button>
      {showReplyInput && (
        <div>
          <input
            type="text"
            value={replyText}
            onChange={handleReplyChange}
          />
          <button onClick={handleReply}>Submit Reply</button>
        </div>
      )}
      <div style={{ marginLeft: '20px', borderLeft: '1px solid #ccc', padding: '8px' }}>
        {comment.replies &&
          comment.replies.map((reply) => (
            <div key={reply.id}>
              <p>{reply.text}</p>
              <button onClick={() => handleDeleteReply(reply.id)}>Delete Reply</button>
              <button onClick={() => setShowNestedReplyInput(!showNestedReplyInput)}>Reply</button>
              {showNestedReplyInput && (
                <div>
                  <input
                    type="text"
                    value={replyText} // Use a different state for nested replies
                    onChange={handleReplyChange}
                  />
                  <button onClick={handleReply}>Submit Reply</button>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default CommentDisplay;

