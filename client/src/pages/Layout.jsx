import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Loader from '../components/Loader.jsx'
import {useSelector} from "react-redux"
import Login from './Login'

const Layout = () => {

  const {user,loading}=useSelector(state=>state.auth)
  console.log(user)
  console.log(loading)

  if(loading){
    return <Loader/>
  }
  return (

   <>
   {user?

     
     
     
     (<div className='min-h-screen bg-gray-50'>
        <Navbar/>

        <Outlet/>

    </div>):
    <Login/>
     }
   </>
  )
}

export default Layout