import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserCreate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  // for creating user and pass email,name and password to backend for storing
  
  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/user', {
        name: name,
        email: email,
        password: password
      });
      if(res.status==201){
          alert("user creaated successfully")
          navigate('/')
      }
    } catch (error) {
      alert('failed to create user')
      console.error("Error creating user:", error);
    }
  };

  return (
    <div>
      <label htmlFor="name">Enter your name</label>
      <input type="text" onChange={(e) => setName(e.target.value)} /><br/>
      
      <label htmlFor="email">Enter your email</label>
      <input type="text" onChange={(e) => setEmail(e.target.value)} /><br/>
      
      <label htmlFor="password">Enter password</label>
      <input type="text" onChange={(e) => setPassword(e.target.value)} /><br/>
      
      <button onClick={handleSubmit}>Sign Up</button>

      <p>Already have account <a href="/">Login</a></p>
    </div>
  );
}

export default UserCreate;
