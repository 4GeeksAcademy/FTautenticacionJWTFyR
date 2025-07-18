import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BACKEND_URL from '../api/backendURL';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {

            const res = await axios.post(`${BACKEND_URL}/api/Login`, { email, password });
            console.log("respuesta del backend:", res.data);
            localStorage.setItem('token', res.data.create_access_token);
            navigate('/private');
        } catch (error) {
            console.error("login error", error)
            alert('Incorrect Cradentials');
        }

    };

    return (
        <form onSubmit={handleLogin}>
            <h2 class="text-center m-4">Login</h2>
            <div class="mb-3 p-2">
                <label for="inputEmailRegister" class="form-label">Regsitered Email</label>
                <input type="email" class="form-control" id="inputEmailRegister" onChange={(e) => setEmail(e.target.value)} placeholder='Regsitered Email' required autoComplete='username' />
            </div>
            <div class="mb-3 p-2">
                <label for="inputPasswordResiter" class="form-label">Password Register</label>
                <input type="password" class="form-control" id="inputPasswordResiter" onChange={(e) => setPassword(e.target.value)} placeholder='Password Register' required autoComplete='current-password' />
            </div>
            <div className='p-3 justify-content-center'>
                <button type='  submit' class=" btn btn-primary">Start</button>
            </div>
            
        </form>
    );
};

export default Login;