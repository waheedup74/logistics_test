<?php
    
    namespace App\Http\Resources;
    
    use Illuminate\Http\Request;
    use Illuminate\Http\Resources\Json\JsonResource;
    
    class WarehouseResource extends JsonResource {
        
        public function toArray ( Request $request ): array {
            return [
                'id'          => $this -> id,
                'supplier'    => $this -> supplier,
                'name'        => $this -> name,
                'address'     => $this -> address,
                'supplier_id' => $this -> supplier_id,
            ];
        }
    }
