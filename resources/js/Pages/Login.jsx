import axios from "axios";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {showErrorToast} from "@/Pages/toastNotifications";

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/login', {
                email,
                password,
                remember: rememberMe
            });
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
            localStorage.setItem('token', response.data.data.token);
            navigate('/users');
        } catch (error) {
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message;
                showErrorToast(errorMessage);
            } else {
                showErrorToast('An unexpected error occurred.');
            }
        }
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 offset-md-4">
                        <div className="vh-100 d-flex justify-content-center align-items-center flex-column">
                            <h1 className="roboto-bold mb-2">Logistics App</h1>
                            <form method="post" className="w-100 border rounded-2 p-4" onSubmit={handleSubmit}>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email">Email address</label>
                                    <input type="email" id="email" className="form-control" autoFocus={true}
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input type="password" id="password" className="form-control" value={password}
                                           onChange={(e) => setPassword(e.target.value)}/>
                                </div>

                                <div className="row mb-4">
                                    <div className="col d-flex justify-content-between">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="1"
                                                   id="remember-me"
                                                   checked={rememberMe}
                                                   onChange={(e) => setRememberMe(e.target.checked)}/>
                                            <label className="form-check-label" htmlFor="remember-me">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <button type="submit"
                                        className="btn btn-primary btn-block w-100 mb-4">Sign in
                                </button>

                                <div className="text-center">
                                    <p>
                                        Not a member?
                                        <Link to='/register'
                                              className="text-dark ms-1 text-decoration-none">Register</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}