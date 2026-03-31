import React, { useState } from 'react'
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("sriram@gmail.com");
  const [password, setPassword] = useState("Sriram@123");

  const handleForm = async () => {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        emailId: email,
        password: password
      }, {withCredentials: true});
    } catch(e) {
      console.log(e.message);
    }
  }
  return (
    <div className='flex justify-center my-4'>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

        <label className="label">Password</label>
        <input type="password" className="input" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

        <button className="btn btn-neutral mt-4" onClick={handleForm}>Login</button>
      </fieldset>
    </div>
  )
}

export default Login