<?php
    
    namespace App\Http\Controllers\api;
    
    use App\Http\Controllers\Controller;
    use App\Http\Requests\UserFormRequest;
    use App\Http\Resources\UsersResource;
    use App\Models\User;
    use App\Services\UserService;
    use App\traits\ApiResponse;
    use Illuminate\Database\QueryException;
    use Illuminate\Http\JsonResponse;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\DB;
    
    class UserController extends Controller {
        
        use ApiResponse;
        
        protected object $userService;
        
        public function __construct ( UserService $userService ) {
            $this -> userService = $userService;
        }
        
        public function index (): JsonResponse {
            $users = UsersResource ::collection ( $this -> userService -> all () );
            return $this -> sendResponse ( $users );
        }
        
        public function store ( UserFormRequest $request ): JsonResponse {
            try {
                DB ::beginTransaction ();
                $user = $this -> userService -> save ( $request );
                DB ::commit ();
                return $this -> sendResponse ( new UsersResource( $user ) );
            }
            catch ( QueryException|\Exception $exception ) {
                DB ::rollBack ();
                return $this -> sendError ( $exception -> getMessage () );
            }
        }
        
        public function show ( User $user ): JsonResponse {
            return $this -> sendResponse ( new UsersResource( $user ) );
        }
        
        public function update ( UserFormRequest $request, User $user ): JsonResponse {
            try {
                DB ::beginTransaction ();
                $user = $this -> userService -> update ( $request, $user );
                DB ::commit ();
                return $this -> sendResponse ( new UsersResource( $user ) );
            }
            catch ( QueryException|\Exception $exception ) {
                DB ::rollBack ();
                return $this -> sendError ( $exception -> getMessage () );
            }
        }
        
        public function destroy ( User $user ): JsonResponse {
            try {
                DB ::beginTransaction ();
                $this -> userService -> delete ( $user );
                DB ::commit ();
                return $this -> sendResponse ( new UsersResource( $user ) );
            }
            catch ( QueryException|\Exception $exception ) {
                DB ::rollBack ();
                return $this -> sendError ( $exception -> getMessage () );
            }
        }
    }
