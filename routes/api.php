<?php
    
    use App\Http\Controllers\api\AuthController;
    use App\Http\Controllers\api\ProductController;
    use App\Http\Controllers\api\SupplierController;
    use App\Http\Controllers\api\UserController;
    use App\Http\Controllers\api\WarehouseController;
    use App\Http\Controllers\api\WarehouseProductController;
    use Illuminate\Support\Facades\Route;
    
    
    Route ::post ( '/login', [ AuthController::class, 'login' ] );
    Route ::post ( '/register', [ UserController::class, 'store' ] ) -> withoutMiddleware ( 'auth:sanctum' );
    
    Route ::middleware ( 'auth:sanctum' ) -> group ( function () {
        Route ::apiResource ( 'users', UserController::class );
        Route ::apiResource ( 'suppliers', SupplierController::class );
        Route ::apiResource ( 'warehouses', WarehouseController::class );
        Route ::apiResource ( 'products', ProductController::class );
        Route ::apiResource ( 'warehouses.warehouseProducts', WarehouseProductController::class );
        Route ::post ( '/logout', [ AuthController::class, 'logout' ] );
    } );
