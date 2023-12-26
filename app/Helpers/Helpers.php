<?php

use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

if (!function_exists('getUrl')) {
	function getUrl($endpoint = "")
	{
		$tunnel = openTunnel(
			server()->ip_address,
			'7806',
			'',
			'',
		);

		if (!is_numeric($tunnel)) {
			if ((int) $tunnel == 0) {
				return abort(__("Cannot initialize socket connection."), 502);
			}

			return abort(__("Cannot initialize socket connection. " . $tunnel), 502);
		}

		return "http://127.0.0.1:$tunnel/$endpoint";
	}
}

if (!function_exists('getDefaults')) {
	function getDefaults()
	{
		global $limanData;

		return [
			'headers' => [
				'Content-Type' => 'application/json',
			],
			'verify' => false
		];
	}
}

if (!function_exists('getResponse')) {
	function getResponse($function, $opts = [])
	{
		$client = new Client(array_merge_recursive($opts, getDefaults()));
		try {
			$response = $function($client);
			$response = json_decode($response->getBody()->getContents());
			return $response;
		} catch (GuzzleException $exception) {
			$code = 500;
			try {
				if ($exception->getResponse() && $exception->getResponse()->getStatusCode() >= 400) {
					$code = $exception->getResponse()->getStatusCode();
					if ($exception->getResponse()->getStatusCode() == 422) {
						abort(json_decode($exception->getResponse()->getBody()->getContents()), 422);
					}

					$message =
						json_decode($exception->getResponse()->getBody()->getContents())
						->error;
					if ($message == "") {
						$message = $exception->getMessage();
					}
				} else {
					$message = $exception->getMessage();
				}
			} catch (\Throwable $e) {
				$message = $exception->getMessage();
			}

			abort($message, $code);
		}
	}
}

if (!function_exists('getVersion')) {
	function getVersion()
	{
		$json = json_decode(file_get_contents(getPath("db.json")), true);
		return $json["version"];
	}
}
