import axios from "axios";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useQuery} from "react-query";
import {Navbar} from "@/Components/Navbar.jsx";
import {NavLink} from "react-router-dom";
import {showErrorToast, showSuccessToast} from "@/Pages/toastNotifications.js";

const fetchProducts = () => {
    return axios.get('/api/products');
}

const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
        try {
            const response = await axios.delete('/api/products/' + id);
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

export const Products = () => {
    const {isLoading, isFetching, isError, error, data} = useQuery('products', fetchProducts);
    return (
        <>
            <Navbar/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className='d-flex justify-content-end align-items-end mb-2'>
                            <NavLink to='/products/add' className='btn btn-primary btn-sm'>Add New</NavLink>
                        </div>
                        <table className="table table-bordered">
                            <thead className="table-light">
                            <tr>
                                <th scope="col" className='text-center'>#</th>
                                <th scope="col" align='left'>Supplier</th>
                                <th scope="col" align='left'>Warehouse</th>
                                <th scope="col" align='left'>Product</th>
                                <th scope="col" align='left'>Price</th>
                                <th scope="col" align='left'>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {isLoading && (
                                <>
                                    <tr>
                                        <td colSpan="6">Loading data...</td>
                                    </tr>
                                </>
                            )}
                            {isError && (
                                <>
                                    <tr>
                                        <td colSpan="6">{error}</td>
                                    </tr>
                                </>
                            )}
                            {data?.data?.data?.map((product, index) => (
                                <tr key={product.id}>
                                    <th scope="row" className='text-center'>{(index + 1)}</th>
                                    <td>{product?.supplier?.name}</td>
                                    <td>{product?.warehouse?.name}</td>
                                    <td>{product.name}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <NavLink to={'/products/edit/' + product.id} type='button'
                                                 className="btn btn-primary btn-sm me-1">Edit</NavLink>
                                        <button type='button' className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(product.id)}>Delete
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