<?php
    
    namespace App\Http\Controllers\api;
    
    use App\Http\Controllers\Controller;
    use App\Http\Requests\WarehouseFormRequest;
    use App\Http\Resources\WarehouseResource;
    use App\Models\Warehouse;
    use App\Services\WarehouseService;
    use App\traits\ApiResponse;
    use Illuminate\Database\QueryException;
    use Illuminate\Http\JsonResponse;
    use Illuminate\Support\Facades\DB;
    
    class WarehouseController extends Controller {
        
        use ApiResponse;
        
        protected object $warehouseService;
        
        public function __construct ( WarehouseService $warehouseService ) {
            $this -> warehouseService = $warehouseService;
        }
        
        public function index (): JsonResponse {
            $warehouses = WarehouseResource ::collection ( $this -> warehouseService -> all () );
            return $this -> sendResponse ( $warehouses );
        }
        
        public function store ( WarehouseFormRequest $request ): JsonResponse {
            try {
                DB ::beginTransaction ();
                $warehouse = $this -> warehouseService -> save ( $request );
                DB ::commit ();
                return $this -> sendResponse ( new WarehouseResource( $warehouse ) );
            }
            catch ( QueryException|\Exception $exception ) {
                DB ::rollBack ();
                return $this -> sendError ( $exception -> getMessage () );
            }
        }
        
        public function show ( Warehouse $warehouse ): JsonResponse {
            return $this -> sendResponse ( new WarehouseResource( $warehouse ) );
        }
        
        public function update ( WarehouseFormRequest $request, Warehouse $warehouse ): JsonResponse {
            try {
                DB ::beginTransaction ();
                $warehouse = $this -> warehouseService -> update ( $request, $warehouse );
                DB ::commit ();
                return $this -> sendResponse ( new WarehouseResource( $warehouse ) );
            }
            catch ( QueryException|\Exception $exception ) {
                DB ::rollBack ();
                return $this -> sendError ( $exception -> getMessage () );
            }
        }
        
        public function destroy ( Warehouse $warehouse ): JsonResponse {
            try {
                DB ::beginTransaction ();
                $this -> warehouseService -> delete ( $warehouse );
                DB ::commit ();
                return $this -> sendResponse ( new WarehouseResource( $warehouse ) );
            }
            catch ( QueryException|\Exception $exception ) {
                DB ::rollBack ();
                return $this -> sendError ( $exception -> getMessage () );
            }
        }
    }
