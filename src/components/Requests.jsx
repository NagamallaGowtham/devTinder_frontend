import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
    const requests = useSelector(store => store.requests?.data);
    const dispatch = useDispatch();

    const fetchConnectionRequest = async () => {
        if (requests) return;
        try {
            const requests = await axios.get(BASE_URL + "/user/requests/received", {withCredentials: true});
            dispatch(addRequests(requests.data));
        } catch (err) {
            console.log(err.message);
        }
    }

    const respondRequest = async (status, id) => {
        try {
            await axios.post(BASE_URL + "/request/review/" + status + "/" + id, {}, {withCredentials: true});
            dispatch(removeRequest(id));
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchConnectionRequest();
    }, []);

    if (!requests) return

    if (requests.length === 0) return <p>No connection requests</p>
  return (
    <div className='flex flex-col justify-center my-4'>
        <h1 className='text-center font-bold text-5xl my-4'>Request receieved</h1>
        {requests && requests.map(r => (
            <div key={r._id} className='m-2 p-2 bg-amber-950 rounded-xl'>
                <h2 className='text-white p-2'>{r.fromUserId?.firstName + " " + r.fromUserId?.lastName}</h2>
                <div>
                    <button className="btn btn-secondary m-2" onClick={() => respondRequest("rejected", r?._id)}>Reject</button>
                    <button className="btn btn-primary m-2" onClick={() => respondRequest("accepted", r?._id)}>Accept</button>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Requests