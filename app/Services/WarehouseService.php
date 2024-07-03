<?php
    
    namespace App\Services;
    
    use App\Models\Warehouse;
    use Illuminate\Database\Eloquent\Collection;
    
    class WarehouseService {
        
        public function all (): Collection {
            return Warehouse ::with ( 'supplier' ) -> get ();
        }
        
        public function save ( $request ) {
            return Warehouse ::create ( [
                                            'user_id'     => auth () -> user () -> id,
                                            'supplier_id' => $request -> input ( 'supplier' ),
                                            'name'        => $request -> input ( 'name' ),
                                            'slug'        => str ( $request -> input ( 'name' ) ) -> slug ( '-' ),
                                            'address'     => $request -> input ( 'address' ),
                                        ] );
        }
        
        public function update ( $request, $warehouse ) {
            $warehouse -> supplier_id = $request -> input ( 'supplier' );
            $warehouse -> name        = $request -> input ( 'name' );
            $warehouse -> address     = $request -> input ( 'address' );
            $warehouse -> update ();
            return $warehouse;
        }
        
        public function delete ( $warehouse ): void {
            $warehouse -> delete ();
        }
    }
