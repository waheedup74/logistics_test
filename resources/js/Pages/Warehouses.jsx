import axios from "axios";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useQuery} from "react-query";
import {Navbar} from "@/Components/Navbar.jsx";
import {NavLink} from "react-router-dom";
import {showErrorToast, showSuccessToast} from "@/Pages/toastNotifications.js";

const fetchWarehouses = () => {
    return axios.get('/api/warehouses');
}

const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
        try {
            const response = await axios.delete('/api/warehouses/' + id);
            showSuccessToast("Warehouse has been delete!");
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

export const Warehouses = () => {
    const {isLoading, isFetching, isError, error, data} = useQuery('warehouses', fetchWarehouses);
    return (
        <>
            <Navbar/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className='d-flex justify-content-end align-items-end mb-2'>
                            <NavLink to='/warehouses/add' className='btn btn-primary btn-sm'>Add New</NavLink>
                        </div>
                        <table className="table table-bordered">
                            <thead className="table-light">
                            <tr>
                                <th scope="col" className='text-center'>#</th>
                                <th scope="col" align='left'>Supplier</th>
                                <th scope="col" align='left'>Name</th>
                                <th scope="col" align='left'>Address</th>
                                <th scope="col" align='left'>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {isLoading && (
                                <>
                                    <tr>
                                        <td colSpan="5">Loading data...</td>
                                    </tr>
                                </>
                            )}
                            {isError && (
                                <>
                                    <tr>
                                        <td colSpan="5">{error}</td>
                                    </tr>
                                </>
                            )}
                            {data?.data?.data?.map((warehouse, index) => (
                                <tr key={warehouse.id}>
                                    <th scope="row" className='text-center'>{(index + 1)}</th>
                                    <td>{warehouse?.supplier?.name}</td>
                                    <td>{warehouse.name}</td>
                                    <td>{warehouse.address}</td>
                                    <td>
                                        <NavLink to={'/warehouses/' + warehouse.id + '/products'}
                                                 className="btn btn-warning btn-sm me-1">Products</NavLink>
                                        <NavLink to={'/warehouses/edit/' + warehouse.id}
                                                 className="btn btn-primary btn-sm me-1">Edit</NavLink>
                                        <button type='button' className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(warehouse.id)}>Delete
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