<?php

namespace App\Controllers;

class FileController
{
    public function downloadFile()
    {
        $type = request('type');
        $endpoint = request('endpoint');
        $data = (array) json_decode(request('data'));

        $random = str_random(16);
        $fileName = "/tmp/" . $random . "." . $data['format'];
        $file = fopen($fileName, "w+");

        getResponse(function ($client) use ($type, $endpoint, $data, $file) {
            return $client->request(strtoupper($type), getUrl($endpoint), [
                'sink' => $file,
            ]);
        });

        if (!file_exists($fileName)) {
            abort("File not found", 404);
        } else {
            header("Content-Type: " . mime_content_type($fileName));
            header("Content-Disposition: attachment; filename=" . $random . "." . $data['format']);

            readfile($fileName);
        }
    }
}
