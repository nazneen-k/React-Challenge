

import React, { useState } from "react";
import CommentInput from "./components/CommentInput";
import CommentDisplay from "./components/CommentDisplay";

function App() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const addComment = () => {
    if (newComment.trim() !== "") {
      const comment = {
        id: comments.length + 1,
        text: newComment,
        replies: [],
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  return (
    <div>
      <h1>Comment Section</h1>
      <CommentInput
        newComment={newComment}
        handleCommentChange={handleCommentChange}
        addComment={addComment}
      />
      <div>
        {comments.map((comment, index) => (
          <CommentDisplay
            key={index}
            comment={comment}
            comments={comments}
            setComments={setComments}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
