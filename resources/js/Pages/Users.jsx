import axios from "axios";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useQuery} from "react-query";
import {Navbar} from "@/Components/Navbar.jsx";
import {NavLink} from "react-router-dom";
import {showErrorToast, showSuccessToast} from "@/Pages/toastNotifications.js";

const fetchUsers = () => {
    return axios.get('/api/users');
}

const handleDelete = async (id) => {
    if (confirm('Are you sure?')) {
        try {
            const response = await axios.delete('/api/users/' + id);
            showSuccessToast("User has been delete!");
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

export const Users = () => {
    const {isLoading, isFetching, isError, error, data} = useQuery('users', fetchUsers);
    const authUser = JSON.parse(localStorage.getItem('user'));

    return (
        <>
            <Navbar/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className='d-flex justify-content-end align-items-end mb-2'>
                            <NavLink to='/users/add' className='btn btn-primary btn-sm'>Add New</NavLink>
                        </div>
                        <table className="table table-bordered">
                            <thead className="table-light">
                            <tr>
                                <th scope="col" width="5%" className='text-center'>#</th>
                                <th scope="col" width="30%" align='left'>Name</th>
                                <th scope="col" width="40%" align='left'>Email</th>
                                <th scope="col" width="10%" align='left'>Actions</th>
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
                            {data?.data?.data?.map((user, index) => (
                                <tr key={user.id}>
                                    <th scope="row" className='text-center'>{(index + 1)}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <NavLink to={'/users/edit/' + user.id}
                                                 className="btn btn-primary btn-sm me-1">Edit</NavLink>
                                        {authUser.id !== user.id &&
                                            <button type='button' className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(user.id)}>Delete
                                            </button>
                                        }
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