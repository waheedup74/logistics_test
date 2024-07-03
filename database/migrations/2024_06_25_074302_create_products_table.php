<?php

    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    return new class extends Migration {

        public function up (): void {
            Schema ::create ( 'products', function ( Blueprint $table ) {
                $table -> id ();
                $table -> foreignId ( 'user_id' );
                $table -> foreignId ( 'supplier_id' );
                $table -> foreignId ( 'warehouse_id' );
                $table -> string ( 'name' );
                $table -> string ( 'slug' ) -> unique ();
                $table -> float ( 'price' ) -> nullable ();
                $table -> softDeletes ();
                $table -> timestamps ();

                $table -> foreign ( 'user_id' ) -> references ( 'id' ) -> on ( 'users' ) -> cascadeOnDelete () -> cascadeOnUpdate ();
                $table -> foreign ( 'supplier_id' ) -> references ( 'id' ) -> on ( 'suppliers' ) -> cascadeOnDelete () -> cascadeOnUpdate ();
                $table -> foreign ( 'warehouse_id' ) -> references ( 'id' ) -> on ( 'warehouses' ) -> cascadeOnDelete () -> cascadeOnUpdate ();
            } );
        }

        public function down (): void {
            Schema ::dropIfExists ( 'products' );
        }
    };
