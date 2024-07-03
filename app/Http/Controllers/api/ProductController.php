<?php
    
    namespace App\Http\Controllers\api;
    
    use App\Http\Controllers\Controller;
    use App\Http\Requests\ProductFormRequest;
    use App\Http\Resources\ProductResource;
    use App\Models\Product;
    use App\Services\ProductService;
    use App\traits\ApiResponse;
    use Illuminate\Database\QueryException;
    use Illuminate\Http\JsonResponse;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\DB;
    
    class ProductController extends Controller {
        
        use ApiResponse;
        
        protected object $productService;
        
        public function __construct ( ProductService $productService ) {
            $this -> productService = $productService;
        }
        
        public function index (): JsonResponse {
            $products = ProductResource ::collection ( $this -> productService -> all () );
            return $this -> sendResponse ( $products );
        }
        
        public function store ( ProductFormRequest $request ): JsonResponse {
            try {
                DB ::beginTransaction ();
                $product = $this -> productService -> save ( $request );
                DB ::commit ();
                return $this -> sendResponse ( new ProductResource( $product ) );
            }
            catch ( QueryException|\Exception $exception ) {
                DB ::rollBack ();
                return $this -> sendError ( $exception -> getMessage () );
            }
        }
        
        public function show ( Product $product ): JsonResponse {
            return $this -> sendResponse ( new ProductResource( $product ) );
        }
        
        public function update ( ProductFormRequest $request, Product $product ): JsonResponse {
            try {
                DB ::beginTransaction ();
                $product = $this -> productService -> update ( $request, $product );
                DB ::commit ();
                return $this -> sendResponse ( new ProductResource( $product ) );
            }
            catch ( QueryException|\Exception $exception ) {
                DB ::rollBack ();
                return $this -> sendError ( $exception -> getMessage () );
            }
        }
        
        public function destroy ( Product $product ): JsonResponse {
            try {
                DB ::beginTransaction ();
                $this -> productService -> delete ( $product );
                DB ::commit ();
                return $this -> sendResponse ( new ProductResource( $product ) );
            }
            catch ( QueryException|\Exception $exception ) {
                DB ::rollBack ();
                return $this -> sendError ( $exception -> getMessage () );
            }
        }
    }
