<?php
    
    namespace App\Http\Controllers\api;
    
    use App\Http\Controllers\Controller;
    use App\Http\Requests\WarehouseProductFormRequest;
    use App\Http\Resources\WarehouseProductResource;
    use App\Models\Warehouse;
    use App\Models\WarehouseProduct;
    use App\Services\WarehouseProductService;
    use App\traits\ApiResponse;
    use Illuminate\Database\QueryException;
    use Illuminate\Http\JsonResponse;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\DB;
    
    class WarehouseProductController extends Controller {
        
        use ApiResponse;
        
        public object $warehouseProductService;
        
        public function __construct ( WarehouseProductService $warehouseProductService ) {
            $this -> warehouseProductService = $warehouseProductService;
        }
        
        public function index ( Warehouse $warehouse ): JsonResponse {
            $warehouse -> load ( [ 'products.product' ] );
            $warehouseProducts = WarehouseProductResource ::collection ( $warehouse -> products );
            return $this -> sendResponse ( $warehouseProducts );
        }
        
        public function store ( WarehouseProductFormRequest $request, Warehouse $warehouse ): JsonResponse {
            try {
                DB ::beginTransaction ();
                $warehouseProduct = $this -> warehouseProductService -> save ( $request, $warehouse );
                DB ::commit ();
                return $this -> sendResponse ( new WarehouseProductResource( $warehouseProduct ) );
            }
            catch ( QueryException|\Exception $exception ) {
                DB ::rollBack ();
                return $this -> sendError ( $exception -> getMessage () );
            }
        }
        
        public function show ( WarehouseProduct $warehouseProduct ): JsonResponse {
            return $this -> sendResponse ( new WarehouseProductResource( $warehouseProduct ) );
        }
        
        public function update ( WarehouseProduct $request, Warehouse $warehouse, WarehouseProduct $warehouseProduct ): JsonResponse {
            try {
                DB ::beginTransaction ();
                $warehouseProduct = $this -> warehouseProductService -> update ( $request, $warehouse, $warehouseProduct );
                DB ::commit ();
                return $this -> sendResponse ( new WarehouseProductResource( $warehouseProduct ) );
            }
            catch ( QueryException|\Exception $exception ) {
                DB ::rollBack ();
                return $this -> sendError ( $exception -> getMessage () );
            }
        }
        
        public function destroy ( Warehouse $warehouse, WarehouseProduct $warehouseProduct ): JsonResponse {
            try {
                DB ::beginTransaction ();
                $this -> warehouseProductService -> delete ( $warehouseProduct );
                DB ::commit ();
                return $this -> sendResponse ( new WarehouseProductResource( $warehouseProduct ) );
            }
            catch ( QueryException|\Exception $exception ) {
                DB ::rollBack ();
                return $this -> sendError ( $exception -> getMessage () );
            }
        }
    }
