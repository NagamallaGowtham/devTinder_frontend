import React, { useEffect } from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feedUsers = useSelector(store => store.feed?.data);
  const dispatch = useDispatch();

  const fetchFeed = async () => {
    try {
      const users = await axios.get(BASE_URL + "/user/feed", {withCredentials: true});
      dispatch(addFeed(users.data));
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchFeed();
  }, []);
  return (
    <div className='flex justify-center my-10'>
      {feedUsers && feedUsers.map(user => <UserCard key={user._id} user={user} />)}
    </div>
  )
}

export default Feed