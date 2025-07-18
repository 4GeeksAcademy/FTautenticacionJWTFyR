import { Link, useNavigate,useLocation } from "react-router-dom";
import { useEffect,useState } from "react";


export const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const[isAuthenticated, setIsAutethenticated]=useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");
		setIsAutethenticated(!!token);
	},[location]);



	const logout = () => {
		localStorage.removeItem("token");
		setIsAutethenticated(false);
		navigate("/Login");
	};

	return (
		<nav className="p-1  navbar navbar-light bg-white">
			<Link to= "/">Home</Link>
			{!isAuthenticated &&(
				<>
					<Link to= "/Signup">Signup</Link>
					<Link to= "/Login">Login</Link>
				</>

			)}
			{ isAuthenticated &&(
				<>
					<Link to= "/Private">Private</Link>
					<button class="btn btn-primary"btn btn-primary onClick={logout}>Logout</button>
				</>
			)}	
		</nav>
	);
};