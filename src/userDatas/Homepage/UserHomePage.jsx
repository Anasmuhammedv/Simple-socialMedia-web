import React, { useState, useEffect } from 'react';
import axios from 'axios';
//use react icons forgetting icons
import { GrDislike } from "react-icons/gr";
import { FaRegCommentAlt } from "react-icons/fa";
import { GrLike } from "react-icons/gr";
import CommentsList from './getPostComment';
import { useNavigate } from 'react-router-dom'; //used for navigation 

function PostList() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [commentOpen, setCommentOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [likeStatus, setLikeStatus] = useState({});
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate()
 
  //fetch all post
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/post');
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  //create a dummy product
  const createDummyPost = async () => {
    const response = await axios.post(`http://localhost:4000/api/post/${userId}`);
    if (response.status === 201) {
      alert("Post Created");
      window.location.reload();
    }
  };
 
  //take data that we typed in input
  const handleCommentChange = (postId, value) => {
    setComments(prevComments => ({  
      ...prevComments,
      [postId]: value
    }));
  };

  //commenting  post
  const handleComment = async (id) => {
    if (comments[id]) {
      const res = await axios.post(`http://localhost:4000/api/comment/${userId}/post/${id}`, {
        comment: comments[id]
      });
      if (res.status === 201) {
        alert("Comment created successfully");
        setComments(prevComments => ({
          ...prevComments,
          [id]: '' 
        }));
      }
    }
  };
  //call comment page in same component when click comment button and also pass props to that component while opening
  const openComments = (postId) => {
    setSelectedPostId(postId);
    setCommentOpen(true);
  };


  //liking and update uer post model adding count of likes

  const handleLike = async (id) => {
    try {
     const res =  await axios.post(`http://localhost:4000/api/like/${userId}/post/${id}`);
     const likes = await axios.get(`http://localhost:4000/api/like/post/${id}`)
     console.log(res,likes);
     
      setLikeStatus(prevStatus => ({
        ...prevStatus,
        [id]: { liked: true, disliked: false }
      }));
      alert('post liked')
      window.location.reload()
      
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
  
  //same as liking for unliking 
  const handleUnlike = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/like/${userId}/post/${id}`);
      const likes = await axios.get(`http://localhost:4000/api/like/post/${id}`)
      setLikeStatus(prevStatus => ({
        ...prevStatus,
        [id]: { liked: false, disliked: true }
      }));
      alert('post disliked')
      window.location.reload()
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };


  //logout funcion

  const handleLogout = ()=>{
    localStorage.clear()
    navigate('/')
  }


  return (
    <div>
      {commentOpen && selectedPostId ? ( 
        <CommentsList postId={selectedPostId} commentOpen={setCommentOpen} />
      ) : (
        <>
          <button onClick={createDummyPost}>Create Post</button>
          <button onClick={handleLogout}>Logout</button>
          <div>
            {posts.map((post) => (
              <div key={post._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                <img src={post.image} alt="Post" width="100" />
                <input 
                  type="text" 
                  onChange={(e) => handleCommentChange(post._id, e.target.value)}
                  value={comments[post._id] || ''} 
                  placeholder='Comment Here' 
                />
                <button 
                  onClick={() => handleComment(post._id)} 
                  disabled={!comments[post._id]}
                >
                  Post
                </button>
                <br />
                <GrLike
                  onClick={() => handleLike(post._id)}/>
                <GrDislike
                  onClick={() => handleUnlike(post._id)}/>
                <p>{post.likeCount}</p> 
                <FaRegCommentAlt onClick={() => openComments(post._id)} style={{ cursor: 'pointer' }} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default PostList;

