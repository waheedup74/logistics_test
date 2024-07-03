<?php
    
    namespace App\Services;
    
    use App\Models\Supplier;
    use Illuminate\Database\Eloquent\Collection;
    
    class SupplierService {
        
        public function all (): Collection {
            return Supplier ::all ();
        }
        
        public function save ( $request ) {
            return Supplier ::create ( [
                                           'user_id' => auth () -> user () -> id,
                                           'name'    => $request -> input ( 'name' ),
                                           'slug'    => str ( $request -> input ( 'name' ) ) -> slug ( '-' ),
                                           'address' => $request -> input ( 'address' ),
                                       ] );
        }
        
        public function update ( $request, $supplier ) {
            $supplier -> name    = $request -> input ( 'name' );
            $supplier -> address = $request -> input ( 'address' );
            $supplier -> update ();
            return $supplier;
        }
        
        public function delete ( $supplier ): void {
            $supplier -> delete ();
        }
    }
