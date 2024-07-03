<?php
    
    namespace App\Http\Requests;
    
    use Illuminate\Foundation\Http\FormRequest;
    
    class WarehouseFormRequest extends FormRequest {
        
        public function authorize (): bool {
            return true;
        }
        
        public function rules (): array {
            return [
                'supplier' => [ 'required', 'numeric', 'exists:suppliers,id' ],
                'name'     => [ 'required', 'string' ],
                'address'  => [ 'nullable', 'string' ],
            ];
        }
    }
