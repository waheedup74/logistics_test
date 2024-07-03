import axios from "axios";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Navbar} from "@/Components/Navbar.jsx";
import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {showErrorToast, showSuccessToast} from "@/Pages/toastNotifications.js";
import {useQuery} from "react-query";

const fetchSupplier = (id) => {
    return axios.get('/api/suppliers/' + id);
}

export const EditSuppliers = () => {
    const {id} = useParams();
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const {data, isSuccess} = useQuery(['supplier', id], () => fetchSupplier(id));

    useEffect(() => {
        if (isSuccess && data) {
            setName(data?.data?.data?.name);
            setAddress(data?.data?.data?.address);
        }
    }, [data, isSuccess]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put('/api/suppliers/' + id, {
                name,
                address,
            });
            showSuccessToast('Supplier has been updated!');
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
                            <h4 className='roboto-bold'>Edit Supplier</h4>
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
                            <button type="submit" className="btn btn-primary w-auto mb-4">Edit Supplier</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}