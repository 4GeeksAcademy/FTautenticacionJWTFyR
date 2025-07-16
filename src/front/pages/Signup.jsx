import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BACKEND_URL from '../api/backendURL';



const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handelSignup = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${BACKEND_URL}/api/Signup`, { email, password });
            console.log('respuesta del backend:', res.data)
            navigate('/Login');
        } catch (error) {
            console.error("error en el resgistro:", error);
            alert('Error When Registering');
        }
    };

    return (
        <form onSubmit={handelSignup}>
            <h2>Signup</h2>
            <input type='email' onChange={(e) => setEmail(e.target.value)}
                placeholder='EMAIL' required />
            <input type='password' onChange={(e) => setPassword(e.target.value)}
                placeholder='PASSWORD' required />
            <button type="submit">Register</button>
        </form>
    );

};

export default Signup;