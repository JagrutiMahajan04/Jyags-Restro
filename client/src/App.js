import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import BookTable from './views/BookTable/BookTable.js'

import Home from "./views/Home/Home.js"
import Login from "./views/Login/Login.js"
import MyOrders from './views/MyOrders/MyOrders.js'
import Signup from './views/Signup/Signup.js'
import Profile from './views/Profile/Profile.js'
import Navbar from './components/Navbar/Navbar.js'
import MyList from './views/MyList/MyList'


function App(){
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>       
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/booktable" element={<BookTable/>}/>
        <Route path="/myList" element={<MyList/>}/>
        <Route path="/myorders" element={<MyOrders/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/navbar" element={<Navbar/>}/>



      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
