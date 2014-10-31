<?php

return array(

    /*
    |--------------------------------------------------------------------------
    | Database Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the database connections setup for your application.
    | Of course, examples of configuring each database platform that is
    | supported by Laravel is shown below to make development simple.
    |
    |
    | All database work in Laravel is done through the PHP PDO facilities
    | so make sure you have the driver for your particular database of
    | choice installed on your machine before you begin development.
    |
    */

    'connections' => array(

        'mysql' => array(
            'driver'        => 'mysql',
            'host'          => $_ENV['MYSQL_HOST'],
            'port'          => $_ENV['MYSQL_PORT'],
            'database'      => $_ENV['MYSQL_DATABASE'],
            'username'      => $_ENV['MYSQL_USERNAME'],
            'password'      => $_ENV['MYSQL_PASSWORD'],
            'unix_socket'   => $_ENV['MYSQL_UNIX_SOCKET'],
            'charset'       => 'utf8',
            'collation'     => 'utf8_unicode_ci',
            'prefix'        => '',
        ),

        'pgsql' => array(
            'driver'   => 'pgsql',
            'host'     => 'localhost',
            'database' => 'homestead',
            'username' => 'homestead',
            'password' => 'secret',
            'charset'  => 'utf8',
            'prefix'   => '',
            'schema'   => 'public',
        ),

    ),

);
