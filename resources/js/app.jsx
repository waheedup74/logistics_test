import ReactDom from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {QueryClientProvider, QueryClient, useQuery} from "react-query";
import {Login} from "@/Pages/Login.jsx";
import {Register} from "@/Pages/Register.jsx";
import {Users} from "@/Pages/Users.jsx";
import {Products} from "@/Pages/Products.jsx";
import {Suppliers} from "@/Pages/Suppliers.jsx";
import {Warehouses} from "@/Pages/Warehouses.jsx";
import {AddUsers} from "@/Pages/AddUsers.jsx";
import {AddSuppliers} from "@/Pages/AddSuppliers.jsx";
import {AddWarehouses} from "@/Pages/AddWarehouses.jsx";
import {AddProducts} from "@/Pages/AddProducts.jsx";
import ProtectedRoute from "@/Components/ProtectedRoute.jsx";
import {EditUser} from "@/Pages/EditUser.jsx";
import {EditProducts} from "@/Pages/EditProducts.jsx";
import {EditSuppliers} from "@/Pages/EditSuppliers.jsx";
import {EditWarehouse} from "@/Pages/EditWarehouses.jsx";
import '../css/app.css'
import {WarehouseProducts} from "@/Pages/WarehouseProducts.jsx";
import {AddWarehouseProducts} from "@/Pages/AddWarehouseProducts.jsx";
import {PageNotFound} from "@/Pages/PageNotFound.jsx";

function MyApp() {
    const queryClient = new QueryClient();
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>

                    <Route element={<ProtectedRoute/>}>
                        <Route path='/users' element={<Users/>}/>
                        <Route path='/users/add' element={<AddUsers/>}/>
                        <Route path='/users/edit/:id' element={<EditUser/>}/>

                        <Route path='/products' element={<Products/>}/>
                        <Route path='/products/add' element={<AddProducts/>}/>
                        <Route path='/products/edit/:id' element={<EditProducts/>}/>

                        <Route path='/suppliers' element={<Suppliers/>}/>
                        <Route path='/suppliers/add' element={<AddSuppliers/>}/>
                        <Route path='/suppliers/edit/:id' element={<EditSuppliers/>}/>

                        <Route path='/warehouses' element={<Warehouses/>}/>
                        <Route path='/warehouses/add' element={<AddWarehouses/>}/>
                        <Route path='/warehouses/edit/:id' element={<EditWarehouse/>}/>
                        <Route path='/warehouses/:id/products' element={<WarehouseProducts/>}/>
                        <Route path='/warehouses/:id/products/add' element={<AddWarehouseProducts/>}/>
                    </Route>

                    <Route path='*' element={<PageNotFound/>}/>
                </Routes>
            </QueryClientProvider>
        </BrowserRouter>
    )
}

ReactDom.createRoot(document.getElementById('root')).render(<MyApp/>);