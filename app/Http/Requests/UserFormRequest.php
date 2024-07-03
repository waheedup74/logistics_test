<?php
    
    namespace App\Http\Requests;
    
    use Illuminate\Foundation\Http\FormRequest;
    
    class UserFormRequest extends FormRequest {
        
        public function authorize (): bool {
            return true;
        }
        
        public function rules (): array {
            $user = $this -> user ? $this -> user -> id : null;
            return [
                'name'     => [ 'required', 'string', 'max:255' ],
                'email'    => [ 'required', 'email', 'max:255', 'unique:users,email,' . $user ],
                'password' => [ 'nullable', 'string', 'min:8' ],
            ];
        }
    }
