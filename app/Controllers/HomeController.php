<?php

namespace App\Controllers;

class HomeController
{
	public function index()
	{
		return view('index');
	}

	public function development()
	{
		return view('index_development');
	}
}
