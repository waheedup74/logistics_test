import axios from "axios";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Navbar} from "@/Components/Navbar.jsx";
import {NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {showErrorToast, showSuccessToast} from "@/Pages/toastNotifications.js";
import {useQuery} from "react-query";

const fetchSuppliers = () => {
    return axios.get('/api/suppliers');
}

const fetchWarehouse = (id) => {
    return axios.get('/api/warehouses/' + id);
}

export const EditWarehouse = () => {
    const {id} = useParams();
    const {data} = useQuery('suppliers', fetchSuppliers);
    const {data: warehouse, isSuccess} = useQuery(['supplier', id], () => fetchWarehouse(id));
    const [supplier, setSupplier] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (isSuccess && data) {
            setSupplier(warehouse?.data?.data?.supplier_id);
            setName(warehouse?.data?.data?.name);
            setAddress(warehouse?.data?.data?.address);
        }
    }, [warehouse, isSuccess]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put('/api/warehouses/' + id, {
                name,
                supplier,
                address,
            });
            showSuccessToast('Warehouse has been updated!');
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
                            <h4 className='roboto-bold'>Edit Warehouse</h4>
                            <NavLink to='/warehouses' className='btn btn-primary btn-sm'>Back to Warehouses</NavLink>
                        </div>
                        <form method="post" className="w-100 rounded border ps-4 pe-4 pt-4" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="form-group col-md-3 mb-4">
                                    <label className="form-label" htmlFor="supplier">Supplier</label>
                                    <select value={supplier} name='supplier' className='form-control' required={true}
                                            onChange={(e) => setSupplier(e.target.value)}>
                                        <option value=''>Select</option>
                                        {data?.data?.data?.map((supplier, index) => (
                                            <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group col-md-3 mb-4">
                                    <label className="form-label" htmlFor="name">Name</label>
                                    <input type="text" id="name" className="form-control" autoFocus={true}
                                           value={name} required={true}
                                           onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group col-md-6 mb-4">
                                    <label className="form-label" htmlFor="address">Address</label>
                                    <input type="text" id="address" className="form-control"
                                           value={address}
                                           onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary w-auto mb-4">Edit Warehouse</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}