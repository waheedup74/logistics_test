<?php
    
    namespace App\Http\Requests;
    
    use Illuminate\Foundation\Http\FormRequest;
    
    class ProductFormRequest extends FormRequest {
        
        public function authorize (): bool {
            return true;
        }
        
        public function rules (): array {
            return [
                'supplier'  => [ 'required', 'numeric', 'exists:suppliers,id' ],
                'warehouse' => [ 'required', 'numeric', 'exists:warehouses,id' ],
                'name'      => [ 'required', 'string' ],
                'price'     => [ 'required', 'numeric' ],
            ];
        }
    }
