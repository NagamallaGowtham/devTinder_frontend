import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router'
import axios from 'axios'
import Footer from './Footer'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const user = await axios.get(BASE_URL + "/profile/view", {withCredentials: true});
      dispatch(addUser(user.data));
    } catch(err) {
      if (err.status === 400 || err.status === 401) {
        return navigate("/login");
      }
      console.log(err)
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
        <Navbar />
        <Outlet />
        <Footer />
    </div>
  )
}

export default Body