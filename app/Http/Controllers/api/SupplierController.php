<?php
    
    namespace App\Http\Controllers\api;
    
    use App\Http\Controllers\Controller;
    use App\Http\Requests\SupplierFormRequest;
    use App\Http\Resources\SupplierResource;
    use App\Models\Supplier;
    use App\Services\SupplierService;
    use Illuminate\Database\QueryException;
    use Illuminate\Http\JsonResponse;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\DB;
    use App\traits\ApiResponse;
    
    class SupplierController extends Controller {
        
        use ApiResponse;
        
        protected object $supplierService;
        
        public function __construct ( SupplierService $supplierService ) {
            $this -> supplierService = $supplierService;
        }
        
        public function index (): JsonResponse {
            $suppliers = SupplierResource ::collection ( $this -> supplierService -> all () );
            return $this -> sendResponse ( $suppliers );
        }
        
        public function store ( SupplierFormRequest $request ): JsonResponse {
            try {
                DB ::beginTransaction ();
                $supplier = $this -> supplierService -> save ( $request );
                DB ::commit ();
                return $this -> sendResponse ( new SupplierResource( $supplier ) );
            }
            catch ( QueryException|\Exception $exception ) {
                DB ::rollBack ();
                return $this -> sendError ( $exception -> getMessage () );
            }
        }
        
        public function show ( Supplier $supplier ): JsonResponse {
            return $this -> sendResponse ( new SupplierResource( $supplier ) );
        }
        
        public function update ( Request $request, Supplier $supplier ): JsonResponse {
            try {
                DB ::beginTransaction ();
                $supplier = $this -> supplierService -> update ( $request, $supplier );
                DB ::commit ();
                return $this -> sendResponse ( new SupplierResource( $supplier ) );
            }
            catch ( QueryException|\Exception $exception ) {
                DB ::rollBack ();
                return $this -> sendError ( $exception -> getMessage () );
            }
        }
        
        public function destroy ( Supplier $supplier ): JsonResponse {
            try {
                DB ::beginTransaction ();
                $this -> supplierService -> delete ( $supplier );
                DB ::commit ();
                return $this -> sendResponse ( new SupplierResource( $supplier ) );
            }
            catch ( QueryException|\Exception $exception ) {
                DB ::rollBack ();
                return $this -> sendError ( $exception -> getMessage () );
            }
        }
    }
