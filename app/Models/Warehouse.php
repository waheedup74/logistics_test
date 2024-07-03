<?php
    
    namespace App\Models;
    
    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\Relations\BelongsTo;
    use Illuminate\Database\Eloquent\Relations\HasMany;
    use Illuminate\Database\Eloquent\SoftDeletes;
    
    class Warehouse extends Model {
        use HasFactory, SoftDeletes;
        
        protected $guarded = [];
        
        public function supplier (): BelongsTo {
            return $this -> belongsTo ( Supplier::class );
        }
        
        public function products (): HasMany {
            return $this -> hasMany ( WarehouseProduct::class );
        }
    }
