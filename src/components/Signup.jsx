import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleForm = async () => {
        try {
            await axios.post(BASE_URL + "/signup", {
                firstName,
                lastName,
                emailId: email,
                password
            }, {withCredentials: true});
            setError("");
            return navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    }
  return (
    <div>
        <div className='flex justify-center my-4'>
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Sign up</legend>

                <label className="label">First name</label>
                <input type="text" className="input" placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} />

                <label className="label">Last name</label>
                <input type="text" className="input" placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} />

                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

                <label className="label">Password</label>
                <input type="password" className="input" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

                {error && <p className='text-red-800'>Error: {error}</p>}
                <button className="btn btn-neutral mt-4" onClick={handleForm}>Sign up</button>

                <p className='mt-4'>Already registered? Login <Link to="/login" className='underline'>here</Link></p>
            </fieldset>
        </div>
    </div>
  )
}

export default Signup