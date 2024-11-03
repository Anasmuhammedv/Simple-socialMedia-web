import React, { useEffect, useState } from 'react';
//axios is used fro connecting
import axios from 'axios';


//take 2 props 
function CommentsList({ postId,commentOpen }) {
  const [comments, setComments] = useState([]);
  console.log(postId,commentOpen);
  

  //used to fetch all comment of particular post
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/comment/${postId}`);
        setComments(response.data.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [postId]);

  return (
    <div>
      <h2>Comments</h2>
      <button onClick={()=>commentOpen(false)}>Back To Home</button>
      <div className="comments-container">
        {comments.map((comment) => (
          <div 
            key={comment._id} 
            className="comment-item" 
            style={{
              border: '1px solid #ddd', 
              padding: '8px', 
              margin: '5px 0', 
              width: '300px'
            }}
          >
            <p><strong>User:</strong> {comment.userId?.name}<strong>  Comment:</strong> {comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentsList;
