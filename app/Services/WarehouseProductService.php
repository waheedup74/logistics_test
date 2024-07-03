<?php
    
    namespace App\Services;
    
    use App\Models\WarehouseProduct;
    use Illuminate\Database\Eloquent\Collection;
    
    class WarehouseProductService {
        
        public function all (): Collection {
            return WarehouseProduct ::with ( [ 'warehouse', 'product' ] ) -> get ();
        }
        
        public function save ( $request, $warehouse ) {
            return WarehouseProduct ::create ( [
                                                   'user_id'      => auth () -> user () -> id,
                                                   'product_id'   => $request -> input ( 'product' ),
                                                   'warehouse_id' => $warehouse -> id,
                                                   'quantity'     => $request -> input ( 'quantity' ),
                                               ] );
        }
        
        public function update ( $request, $warehouse, $warehouseProduct ) {
            $warehouseProduct -> warehouse_id = $warehouse -> id;
            $warehouseProduct -> product_id   = $request -> input ( 'product' );
            $warehouseProduct -> quantity     = $request -> input ( 'quantity' );
            $warehouseProduct -> update ();
            return $warehouseProduct;
        }
        
        public function delete ( $warehouseProduct ): void {
            $warehouseProduct -> delete ();
        }
        
    }
