import { useEffect, useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../api/backendURL';
import { useNavigate } from 'react-router-dom';

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
        <div>
            <h2>PRIVATE ZONE</h2>
            <p>{message}</p>
        </div>
    );
};

export default Private;