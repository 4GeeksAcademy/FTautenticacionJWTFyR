import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem("token");
		navigate("/Login");
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<Link to= "/">Home</Link>
			<Link to= "/Signup">Signup</Link>
			<Link to= "/Login">Login</Link>
			<Link to= "/Private">Private</Link>
			<button onClick={logout}>Logout</button>
		</nav>
	);
};