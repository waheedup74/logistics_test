import {NavLink, useNavigate} from "react-router-dom";
import axios from "axios";
import {showErrorToast, showSuccessToast} from "@/Pages/toastNotifications.js";

export const Navbar = () => {

    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const response = await axios.post('/api/logout');
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message;
                showErrorToast(errorMessage);
            } else {
                showErrorToast('An unexpected error occurred.');
            }
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
                <div className="container">
                    <NavLink className="navbar-brand" to={'/users'}>Logistics</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to='/users'>Users</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to='/products'>Products</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to='/suppliers'>Suppliers</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to='/warehouses'>Warehouses</NavLink>
                            </li>
                        </ul>
                        <button className="btn btn-outline-danger" type="button" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </nav>
        </>
    )
}