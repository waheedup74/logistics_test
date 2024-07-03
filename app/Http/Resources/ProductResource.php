<?php
    
    namespace App\Http\Resources;
    
    use Illuminate\Http\Request;
    use Illuminate\Http\Resources\Json\JsonResource;
    
    class ProductResource extends JsonResource {
        
        public function toArray ( Request $request ): array {
            return [
                'id'           => $this -> id,
                'supplier'     => $this -> supplier,
                'warehouse'    => $this -> warehouse,
                'name'         => $this -> name,
                'price'        => $this -> price,
                'supplier_id'  => $this -> supplier_id,
                'warehouse_id' => $this -> warehouse_id,
            ];
        }
    }
