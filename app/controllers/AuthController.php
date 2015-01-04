<?php

class AuthController extends \BaseController {

	/**
	 * Login an user.
	 * POST /auth/login
	 *
	 * @return Response
	 */
	public function login()
	{
		$this->tamperRequest();
		return Response::json(Authorizer::issueAccessToken());
	}

	/**
	 * Register an user.
	 * POST /auth/register
	 *
	 * @return Response
	 */
	public function register()
	{
		$validator = Validator::make($data = Input::all(), User::$rules);

		if ($validator->fails())
		{
			return Response::json([
				'error' => 'validation',
				'error_description' => 'Validation error',
				'errors' => $validator->messages()->all(),
			], 400);
		}

		$user = User::create($data);

		return $this->login();
	}

	/**
	 * Supply the user id.
	 * GET /auth/user
	 *
	 * @return Response
	 */
	public function getUserId()
	{
		return Response::json(Authorizer::getResourceOwnerId());
	}

	/**
	 * Add client_id and client secret to the requst body.
	 *
	 * @return Response
	 */
	protected function tamperRequest()
	{
				$parameters = array(
						'grant_type'    => 'password',
						'client_id'     => $_ENV['CLIENT_ID'],
						'client_secret' => $_ENV['CLIENT_SECRET'],
						'username'      => Input::get('username'),
						'password'      => Input::get('password'),
						// 'scope'         => Config::get('api.scope')
				);

				// Save the current input
				// $currentInput = Input::all();

				// Input::replace($parameters);

				// Build an internal request
				$request = Request::create(Request::url(), Request::method(), $parameters);
				$request->request->replace($parameters);

				// Deliver the modified request to the Authorizer class
				Authorizer::setRequest($request);

				// Run the request through the router and return the content
				// $response = Route::dispatch($request)->getContent();

				// Restore the input
				// Input::replace($currentInput);
	}
}
