<?php
    
    namespace App\Services;
    
    use App\Models\Product;
    use Illuminate\Database\Eloquent\Collection;
    
    class ProductService {
        
        public function all (): Collection {
            return Product ::with ( [ 'warehouse', 'supplier' ] ) -> get ();
        }
        
        public function save ( $request ) {
            return Product ::create ( [
                                          'user_id'      => auth () -> user () -> id,
                                          'supplier_id'  => $request -> input ( 'supplier' ),
                                          'warehouse_id' => $request -> input ( 'warehouse' ),
                                          'name'         => $request -> input ( 'name' ),
                                          'slug'         => str ( $request -> input ( 'name' ) ) -> slug ( '-' ),
                                          'price'        => $request -> input ( 'price' ),
                                      ] );
        }
        
        public function update ( $request, $product ) {
            $product -> supplier_id  = $request -> input ( 'supplier' );
            $product -> warehouse_id = $request -> input ( 'warehouse' );
            $product -> name         = $request -> input ( 'name' );
            $product -> price        = $request -> input ( 'price' );
            $product -> update ();
            return $product;
        }
        
        public function delete ( $product ): void {
            $product -> delete ();
        }
    }
