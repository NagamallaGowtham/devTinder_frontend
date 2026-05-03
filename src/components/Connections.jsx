import axios from 'axios';
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';

const Connections = () => {
    const connections = useSelector(store => store.connections?.data);
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const connections = await axios.get(BASE_URL + "/user/connections", {withCredentials: true});
            dispatch(addConnections(connections.data));
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return;

    if (connections.length === 0) return <p>No connections</p>
  return (
    <div className='flex flex-col justify-center my-4'>
        <h2 className='text-center font-bold text-5xl my-4'>Connections</h2>
        {connections && connections.map(c => (
            <div key={c._id} className='m-2 p-2 bg-amber-950 rounded-xl'>
                <p className='text-white'>{c.firstName + " " + c.lastName}</p>
            </div>
        ))}
    </div>
  )
}

export default Connections