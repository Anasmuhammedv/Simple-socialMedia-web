import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  let id;

 //login the user also pass data and also store id in localstorage
  const handleSubmit = async () => {
    const data = { email, password };
    try {
      const response = await axios.post('http://localhost:4000/api/user/login', data);
       id = response.data.data._id       
       localStorage.setItem("userId",id)
      if(response.status ==200){
           navigate('/Homepage')
           alert("user login successfull")
      }
    } catch (error) {
      alert('invalid credential or user not found')
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <label htmlFor="email">Enter email</label>
      <input type="text" onChange={(e) => setEmail(e.target.value)} /><br />
      
      <label htmlFor="password">Enter Password</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} /><br />
      
      <button onClick={handleSubmit}>Login</button>

      <p>No account <a href="/Signup">SignUp</a></p>
    </div>
  );
}

export default UserLogin;
