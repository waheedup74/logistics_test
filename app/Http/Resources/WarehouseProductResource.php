<?php
    
    namespace App\Http\Resources;
    
    use Illuminate\Http\Request;
    use Illuminate\Http\Resources\Json\JsonResource;
    
    class WarehouseProductResource extends JsonResource {
        
        public function toArray ( Request $request ): array {
            return [
                'id'           => $this -> id,
                'warehouse_id' => $this -> warehouse_id,
                'product_id'   => $this -> product_id,
                'product'      => new ProductResource ( $this -> product ),
                'quantity'     => $this -> quantity
            ];
        }
    }
