<?php

    namespace App\traits;

    use Illuminate\Http\JsonResponse;

    trait ApiResponse {

        public function sendResponse ( $data, $message = 'Success', $status = 200 ): JsonResponse {
            return response ()
                -> json ( [
                              'status'  => $status,
                              'message' => $message,
                              'data'    => $data
                          ],
                          $status
                );
        }

        public function sendError ( $message, $data = [], $status = 400 ): JsonResponse {
            return response ()
                -> json ( [
                              'status'  => $status,
                              'message' => $message,
                              'data'    => $data
                          ],
                          $status
                );
        }

    }
