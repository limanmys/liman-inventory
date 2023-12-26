<?php

namespace App\Controllers;

class RequestController
{
    public function request($endpoint, $data, $type)
    {
        $request = getResponse(function ($client) use ($type, $endpoint, $data) {
            return $client->request(strtoupper($type), getUrl($endpoint), count($data) ? [
                'json' => $data
            ] : []);
        });

        return $request;
    }

    public function apiProxy()
    {
        validate([
            "type" => "required|in:get,post,put,patch,delete",
            "endpoint" => "required",
            "data" => "json"
        ]);
        $endpoint = request("endpoint");
        $data = json_decode(request("data") ? request("data") : "[]", true);
        $type = request("type");

        $request = getResponse(function ($client) use ($type, $endpoint, $data) {
            return $client->request(strtoupper($type), getUrl($endpoint), count($data) ? [
                'json' => $data
            ] : []);
        });

        return respond($request);
    }
}
