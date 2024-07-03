import axios from "axios";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {Navbar} from "@/Components/Navbar.jsx";
import {NavLink, useParams} from "react-router-dom";
import {useState} from "react";
import {showErrorToast, showSuccessToast} from "@/Pages/toastNotifications.js";
import {useQuery} from "react-query";

const fetchProducts = () => {
    return axios.get('/api/products');
}

export const AddWarehouseProducts = () => {
    const {id: warehouse} = useParams();
    const {data} = useQuery('products', fetchProducts);
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/warehouses/' + warehouse + '/warehouseProducts', {
                warehouse,
                product,
                quantity,
            });
            showSuccessToast('Product has been added!');
            setProduct('');
            setQuantity('');
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
                            <h4 className='roboto-bold'>Add New Warehouse Product</h4>
                            <NavLink to={'/warehouses/' + warehouse + '/products'} className='btn btn-primary btn-sm'>Back
                                to Warehouse Products</NavLink>
                        </div>
                        <form method="post" className="w-100 rounded border ps-4 pe-4 pt-4" onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="form-group col-md-4 mb-4">
                                    <label className="form-label" htmlFor="product">Product</label>
                                    <select value={product} name='supplier' className='form-control' required={true}
                                            onChange={(e) => setProduct(e.target.value)}>
                                        <option value=''>Select</option>
                                        {data?.data?.data?.map((product, index) => (
                                            <option key={product.id} value={product.id}>{product.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group col-md-3 mb-4">
                                    <label className="form-label" htmlFor="quantity">Quantity</label>
                                    <input type="text" id="quantity" className="form-control" autoFocus={true}
                                           value={quantity} required={true}
                                           onChange={(e) => setQuantity(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary w-auto mb-4">Add Warehouse Product</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}