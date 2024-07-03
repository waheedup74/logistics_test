<?php

    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    return new class extends Migration {

        public function up (): void {
            Schema ::create ( 'warehouses', function ( Blueprint $table ) {
                $table -> id ();
                $table -> foreignId ( 'user_id' );
                $table -> foreignId ( 'supplier_id' );
                $table -> string ( 'name' );
                $table -> string ( 'slug' ) -> unique ();
                $table -> text ( 'address' ) -> nullable ();
                $table -> softDeletes ();
                $table -> timestamps ();

                $table -> foreign ( 'user_id' ) -> references ( 'id' ) -> on ( 'users' ) -> cascadeOnDelete () -> cascadeOnUpdate ();
                $table -> foreign ( 'supplier_id' ) -> references ( 'id' ) -> on ( 'suppliers' ) -> cascadeOnDelete () -> cascadeOnUpdate ();
            } );
        }

        public function down (): void {
            Schema ::dropIfExists ( 'warehouses' );
        }
    };
