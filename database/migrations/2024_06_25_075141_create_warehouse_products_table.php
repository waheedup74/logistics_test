<?php

    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    return new class extends Migration {

        public function up (): void {
            Schema ::create ( 'warehouse_products', function ( Blueprint $table ) {
                $table -> id ();
                $table -> foreignId ( 'user_id' );
                $table -> foreignId ( 'warehouse_id' );
                $table -> foreignId ( 'product_id' );
                $table -> integer ( 'quantity' );
                $table -> softDeletes ();
                $table -> timestamps ();

                $table -> foreign ( 'user_id' ) -> references ( 'id' ) -> on ( 'users' ) -> cascadeOnDelete () -> cascadeOnUpdate ();
                $table -> foreign ( 'warehouse_id' ) -> references ( 'id' ) -> on ( 'warehouses' ) -> cascadeOnDelete () -> cascadeOnUpdate ();
                $table -> foreign ( 'product_id' ) -> references ( 'id' ) -> on ( 'products' ) -> cascadeOnDelete () -> cascadeOnUpdate ();
            } );
        }

        public function down (): void {
            Schema ::dropIfExists ( 'warehouse_products' );
        }
    };
