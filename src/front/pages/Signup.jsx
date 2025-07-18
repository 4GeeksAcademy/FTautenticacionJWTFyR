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
            <h2 class="text-center m-4">Signup</h2>
            <div class="mb-3 p-2">
                <label for="inputEmail" class="form-label">Email Adress</label>
                <input type='email' class="form-control" id="inputEmail" onChange={(e) => setEmail(e.target.value)}
                placeholder='You Email' required />
            </div>
            <div class="mb-3 p-2">
                <label for="inputPassword" class="form-label">You Password</label>
                <input type='password' class="form-control" id="inputPassword" onChange={(e) => setPassword(e.target.value)}
                placeholder='You Password' required />

            </div>
            <div class=" p-3 justify-content-center">
                <button type="submit" class="btn btn-primary">Register</button>
            </div>            
        </form>
    );

};

export default Signup;

/*

  <button type="submit" class="btn btn-primary">Submit</button>
</form>
*/