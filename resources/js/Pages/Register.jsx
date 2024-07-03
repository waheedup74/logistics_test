import axios from "axios";
import {useState} from "react";
import {Link} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {showErrorToast, showSuccessToast} from "@/Pages/toastNotifications.js";

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/users', {
                name,
                email,
                password,
            });
            showSuccessToast('Account created!');
            setName('');
            setEmail('');
            setPassword('');
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
                                    <label className="form-label" htmlFor="name">Name</label>
                                    <input type="text" id="name" className="form-control" autoFocus={true}
                                           value={name}
                                           onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email">Email address</label>
                                    <input type="email" id="email" className="form-control"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input type="password" id="password" className="form-control" value={password}
                                           onChange={(e) => setPassword(e.target.value)}/>
                                </div>

                                <button type="submit"
                                        className="btn btn-primary btn-block w-100 mb-4">Sign Up
                                </button>

                                <div className="text-center">
                                    <p>
                                        Already have an account?
                                        <Link to='/'
                                              className="text-dark ms-1 text-decoration-none">Login</Link>
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