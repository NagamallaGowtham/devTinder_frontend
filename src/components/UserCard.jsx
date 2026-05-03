import React from 'react'
import userPlaceholder from "../images/user-placeholder.jpg"
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
    const dispatch = useDispatch();
    const {_id, firstName, lastName, profession, age, gender} = user;

    const handleUserPreference = async (status, id) => {
        try {
            await axios.post(BASE_URL + "/request/send/" + status + "/" + id, {}, {withCredentials: true});
            dispatch(removeFeed(id));
        } catch (err) {
            console.log(err.message);
        }
    }
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
            <img
            src={userPlaceholder}
            alt="User" />
        </figure>
        <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            <p>Profession: {profession}</p>
            {age && gender && <p>Age: {age}, Gender: {gender}</p>}
            <div className="card-actions justify-end">
                <button className="btn btn-secondary" onClick={() => handleUserPreference("ignored", _id)}>Ignore</button>
                <button className="btn btn-primary" onClick={() => handleUserPreference("interested", _id)}>Interested</button>
            </div>
        </div>
    </div>
  )
}

export default UserCard