import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const Profile = () => {
  const user = useSelector(store => store.user?.data);
  const [emailId, setEmailId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profession, setProfession] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setEmailId(user.emailId || "");
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setProfession(user.profession || "");
      setAge(user.age || "");
      setGender(user.gender || "");
    }
  }, [user]);

  const handleEditProfile = async () => {
    setError("");
    try {
      const user = await axios.patch(BASE_URL + "/profile/edit", {
        firstName,
        lastName,
        profession,
        age,
        gender
      }, {withCredentials: true});
      dispatch(addUser(user.data));
    } catch(err) {
      console.log(err);
      setError(err.response.data.message);
    }
  }

  return (
    <div>
      {user && (
        <div className='flex justify-center mt-4'>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              <legend className="fieldset-legend">Edit Profile</legend>

              <label className="label">Email</label>
              <input type="email" className="input" disabled placeholder="Email" value={emailId} onChange={e => setEmailId(e.target.value)} />

              <label className="label">First Name</label>
              <input type="text" className="input" placeholder="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} />

              <label className="label">Last Name</label>
              <input type="text" className="input" placeholder="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />

              <label className="label">Age</label>
              <input type="number" className="input" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />

              <label className="label">Gender</label>
              <input type="text" className="input" placeholder="Gender" value={gender} onChange={e => setGender(e.target.value)} />

              <label className="label">Profession</label>
              <input type="text" className="input" placeholder="Profession" value={profession} onChange={e => setProfession(e.target.value)} />

              {error && <p className='text-red-800'>Error: {error}</p>}
              <button className="btn btn-neutral mt-4" onClick={handleEditProfile}>Save Profile</button>
            </fieldset>
        </div>
      )}
    </div>
  )
}

export default Profile