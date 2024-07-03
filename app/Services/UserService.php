<?php
    
    namespace App\Services;
    
    use App\Models\User;
    use Illuminate\Database\Eloquent\Collection;
    
    class UserService {
        
        public function all (): Collection {
            return User ::latest () -> get ();
        }
        
        public function save ( $request ) {
            return User ::create ( [
                                       'name'     => $request -> input ( 'name' ),
                                       'email'    => $request -> input ( 'email' ),
                                       'password' => $request -> input ( 'password' ),
                                   ] );
        }
        
        public function update ( $request, $user ) {
            $user -> name  = $request -> input ( 'name' );
            $user -> email = $request -> input ( 'email' );
            
            if ( $request -> filled ( 'password' ) )
                $user -> password = bcrypt ( $request -> input ( 'password' ) );
            
            $user -> update ();
            return $user;
        }
        
        public function delete ( $user ): void {
            $user -> delete ();
        }
    }
