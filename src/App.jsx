import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserLogin from './userDatas/UserLogin'
import UserCreate from './userDatas/UserCreate'
import UserHomePage from './userDatas/Homepage/userHomePage'
import GetPostComment from './userDatas/Homepage/getPostComment'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
  <>
     <h1 className='text-end'>Hello Welcome </h1>
     <Routes>
      <Route path = '/' element={<UserLogin/>}/>
      <Route path='/Signup' element={<UserCreate/>}/>
      <Route path='/Homepage' element={<UserHomePage/>}/>
     </Routes>
     
  </>
  )
}

export default App
