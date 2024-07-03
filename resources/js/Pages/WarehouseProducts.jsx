import axios from "axios";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useQuery} from "react-query";
import {Navbar} from "@/Components/Navbar.jsx";
import {NavLink, useParams} from "react-router-dom";
import {showErrorToast, showSuccessToast} from "@/Pages/toastNotifications.js";

const fetchWarehouseProducts = (id) => {
    return axios.get('/api/warehouses/' + id + '/warehouseProducts');
}

const handleDelete = async (id, warehouse_id) => {
    if (confirm('Are you sure?')) {
        try {
            const response = await axios.delete('/api/warehouses/' + warehouse_id + '/warehouseProducts/' + id);
            showSuccessToast("Product has been delete!");
        } catch (error) {
            if (error.response && error.response.data) {
                const errorMessage = error.response.data.message;
                showErrorToast(errorMessage);
            } else {
                showErrorToast('An unexpected error occurred.');
            }
        }
    }
}

export const WarehouseProducts = () => {
    const {id} = useParams();
    const {isLoading, isError, error, data} = useQuery(['warehouses', id], () => fetchWarehouseProducts(id));
    return (
        <>
            <Navbar/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className='d-flex justify-content-end align-items-end mb-2'>
                            <NavLink to={'/warehouses/'} className='btn btn-primary btn-sm me-1'>Back
                                to Warehouses</NavLink>
                            <NavLink to={'/warehouses/' + id + '/products/add'} className='btn btn-primary btn-sm'>Add
                                New</NavLink>
                        </div>
                        <table className="table table-bordered">
                            <thead className="table-light">
                            <tr>
                                <th scope="col" className='text-center'>#</th>
                                <th scope="col" align='left'>Product</th>
                                <th scope="col" align='left'>Quantity</th>
                                <th scope="col" align='left'>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {isLoading && (
                                <>
                                    <tr>
                                        <td colSpan="4">Loading data...</td>
                                    </tr>
                                </>
                            )}
                            {isError && (
                                <>
                                    <tr>
                                        <td colSpan="4">{error}</td>
                                    </tr>
                                </>
                            )}
                            {data?.data?.data?.map((warehouseProduct, index) => (
                                <tr key={warehouseProduct.id}>
                                    <th scope="row" className='text-center'>{(index + 1)}</th>
                                    <td>{warehouseProduct?.product?.name}</td>
                                    <td>{warehouseProduct.quantity}</td>
                                    <td>
                                        <button type='button' className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(warehouseProduct.id, warehouseProduct.warehouse_id)}>Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}