import React from 'react'
import userPlaceholder from "../images/user-placeholder.jpg"

const UserCard = ({user}) => {
    const {firstName, lastName, profession, age, gender} = user;
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
                <button className="btn btn-secondary">Ignore</button>
                <button className="btn btn-primary">Interested</button>
            </div>
        </div>
    </div>
  )
}

export default UserCard