import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './Components/Navbar'
import { Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import ProfilePage from './Pages/ProfilePage'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import StudyMaterialGenerator from './Components/StudyMaterialGenrator'
import StudyMaterialList from './Components/StudyMaterialList'
import VideoSummarizerPage from './Pages/VideoPage'
import AiTutorPage from './Pages/AItutorpage'
import UploadAssignment from './Pages/UploadAssignment'

function App() {
  

  return (
    <>
   <Navbar/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/profile' element={<ProfilePage/>}  />
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/study' element={<StudyMaterialGenerator/>}/>
    <Route path='/studylist' element={<StudyMaterialList/>}/>
    <Route path='/video' element={<VideoSummarizerPage/>}/>
    <Route path='/ask' element={<AiTutorPage/>}/>
    <Route path='/upload' element={<UploadAssignment/>}/>

       </Routes>
    </>
  )
}

export default App
