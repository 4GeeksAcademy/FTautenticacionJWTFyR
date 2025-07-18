import { useEffect, useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../api/backendURL';
import { useNavigate } from 'react-router-dom';
import rigoImageUrl from "../assets/img/rigo-baby.jpg";

const Private = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem('token');

        if (!token) {
            navigate('login');
            return;
        }

        axios.get(`${BACKEND_URL}/api/Private`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        })
            .then(res => setMessage(res.data.msg))
            .catch(error => {
                console.error("Unauthorized", error);
                localStorage.removeItem("token");
                navigate("/login");
            });
    }, [navigate]);

    return (
        <div class="mb-5 text-center">
            <h2 class="text-center m-5">Private Rigo!!</h2>    
            <p className="fs-2 text-center m-5">{message}</p>  
                <p className="lead ">
                    <img src={rigoImageUrl} className=" img-fluid rounded-circle mb-3" alt="Rigo Baby" />
                </p>              
            
        </div>
    );
};

export default Private;