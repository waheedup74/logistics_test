import axios from "axios";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Navbar} from "@/Components/Navbar.jsx";
import {NavLink} from "react-router-dom";
import {useState} from "react";
import {showErrorToast, showSuccessToast} from "@/Pages/toastNotifications.js";

export const AddSuppliers = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/suppliers', {
                name,
                address,
            });
            showSuccessToast('Supplier has been added!');
            setName('');
            setAddress('');
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
                            <h4 className='roboto-bold'>Add New Supplier</h4>
                            <NavLink to='/suppliers' className='btn btn-primary btn-sm'>Back to Suppliers</NavLink>
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

                                <div className="form-group col-md-8 mb-4">
                                    <label className="form-label" htmlFor="address">Address</label>
                                    <input type="text" id="address" className="form-control"
                                           value={address}
                                           onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary w-auto mb-4">Add Supplier</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}