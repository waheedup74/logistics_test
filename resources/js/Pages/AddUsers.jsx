import axios from "axios";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Navbar} from "@/Components/Navbar.jsx";
import {Link, NavLink, redirect} from "react-router-dom";
import {useState} from "react";
import {showErrorToast, showSuccessToast} from "@/Pages/toastNotifications.js";

export const AddUsers = () => {
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
            showSuccessToast('User has been added!');
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
            <Navbar/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className='d-flex justify-content-between align-items-center mb-2'>
                            <h4 className='roboto-bold'>Add New User</h4>
                            <NavLink to='/users' className='btn btn-primary btn-sm'>Back to Users</NavLink>
                        </div>
                        <form method="post" className="w-100 rounded border ps-4 pe-4 pt-4" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="form-group col-md-4 mb-4">
                                    <label className="form-label" htmlFor="name">Name</label>
                                    <input type="text" id="name" className="form-control" autoFocus={true}
                                           value={name}
                                           onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group col-md-4 mb-4">
                                    <label className="form-label" htmlFor="email">Email address</label>
                                    <input type="email" id="email" className="form-control"
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group col-md-4 mb-4">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input type="password" id="password" className="form-control" value={password}
                                           onChange={(e) => setPassword(e.target.value)}/>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary w-auto mb-4">Add User</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}