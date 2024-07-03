<?php
    
    namespace App\Http\Requests;
    
    use Illuminate\Foundation\Http\FormRequest;
    
    class WarehouseProductFormRequest extends FormRequest {
        
        public function authorize (): bool {
            return true;
        }
        
        public function rules (): array {
            return [
                'product'   => [ 'required', 'numeric', 'exists:products,id' ],
                'warehouse' => [ 'required', 'numeric', 'exists:warehouses,id' ],
                'quantity'  => [ 'required', 'numeric', 'min:1' ],
            ];
        }
    }
