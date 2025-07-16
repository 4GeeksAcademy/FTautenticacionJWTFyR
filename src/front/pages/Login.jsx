import {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BACKEND_URL from '../api/backendURL';

const Login = () => {
    const [email,setEmail]= useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDeafult();
        try{

            const res = await axios.post(`${BACKEND_URL}/api/Login`,{email,password});
            console.log("respuesta del backend:",res.data);
            localStorage.setItem('token',res.data.acces_token);
            navigate('/private');
        } catch {
            console.error("login error",error)
            alert('Incorrect Cradentials');
        }

    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input type="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email' required/>
            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' required/>
            <button type='submit'>ENTER</button>
        </form>
    );
};

export default Login;