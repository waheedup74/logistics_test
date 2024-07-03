<?php
    
    namespace App\Models;
    
    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\Relations\BelongsTo;
    use Illuminate\Database\Eloquent\SoftDeletes;
    
    class WarehouseProduct extends Model {
        use HasFactory, SoftDeletes;
        
        protected $guarded = [];
        
        public function warehouse (): BelongsTo {
            return $this -> belongsTo ( Warehouse::class );
        }
        
        public function product (): BelongsTo {
            return $this -> belongsTo ( Product::class );
        }
    }
