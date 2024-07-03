import axios from "axios";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Navbar} from "@/Components/Navbar.jsx";
import {NavLink} from "react-router-dom";
import {useState} from "react";
import {showErrorToast, showSuccessToast} from "@/Pages/toastNotifications.js";
import {useQuery} from "react-query";

const fetchSuppliers = () => {
    return axios.get('/api/suppliers');
}

const fetchWarehouses = () => {
    return axios.get('/api/warehouses');
}

export const AddProducts = () => {
    const {data: suppliers} = useQuery('suppliers', fetchSuppliers);
    const {data: warehouses} = useQuery('warehouses', fetchWarehouses);
    const [supplier, setSupplier] = useState('');
    const [warehouse, setWarehouse] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/products', {
                name,
                supplier,
                warehouse,
                price,
            });
            showSuccessToast('Product has been added!');
            setName('');
            setPrice('');
            setSupplier('');
            setWarehouse('');
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
                            <h4 className='roboto-bold'>Add New Product</h4>
                            <NavLink to='/products' className='btn btn-primary btn-sm'>Back to Products</NavLink>
                        </div>
                        <form method="post" className="w-100 rounded border ps-4 pe-4 pt-4" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="form-group col-md-3 mb-4">
                                    <label className="form-label" htmlFor="supplier">Supplier</label>
                                    <select value={supplier} name='supplier' className='form-control' required={true}
                                            onChange={(e) => setSupplier(e.target.value)}>
                                        <option value=''>Select</option>
                                        {suppliers?.data?.data?.map((supplier, index) => (
                                            <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group col-md-3 mb-4">
                                    <label className="form-label" htmlFor="warehouse">Warehouse</label>
                                    <select value={warehouse} name='warehouse' className='form-control' required={true}
                                            onChange={(e) => setWarehouse(e.target.value)}>
                                        <option value=''>Select</option>
                                        {warehouses?.data?.data?.map((warehouse, index) => (
                                            <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
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

                                <div className="form-group col-md-3 mb-4">
                                    <label className="form-label" htmlFor="price">Price</label>
                                    <input type="number" step='any' id="price" className="form-control"
                                           value={price}
                                           onChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary w-auto mb-4">Add Product</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}