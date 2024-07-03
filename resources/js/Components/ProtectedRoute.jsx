import {Outlet, Navigate} from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem('token');
    const isAuthenticated = token && token.length > 0;
    return isAuthenticated ? <Outlet/> : <Navigate to='/'/>;
}
export default ProtectedRoute;