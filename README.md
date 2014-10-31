ch.bfh.bti7054.w2014.q.uTag
===========================

a microtagger

## Installation

### Frontend

1. Install [Node](http://nodejs.org/)
	
	[Installing node via package manager](https://github.com/joyent/node/wiki/installing-node.js-via-package-manager)

2. Install [Grunt](http://gruntjs.com/)

	Command line tool

	```bash
	npm install -g grunt-cli
	```

	Dependencies

	```bash
	cd </path/to/utag-repo/>
	npm install
	```	

3. Install [Bower](http://bower.io/)

	```bash
	npm install -g bower
	```

	Dependencies

	```bash
	cd </path/to/utag-repo/>
	bower install
	```


### Backend

#### Variant 1

Install [homestead](https://github.com/laravel/homestead) (Recommended)

Follow the guide on the [Laravel docs](http://laravel.com/docs/4.2/homestead)

#### Install phpmyadmin

1. Login to your homestead box
2. Install phpmyadmin

	```bash
	sudo apt-get install phpmyadmin
	```

	* When prompted to select the Web server, select none
	* When prompted to config database for phpmyadmin with dbconfig-common, select Yes and press Enter.
	* When prompted for Password of the database's administrative user, enter secret and press Enter.
	* When prompted for MySQL application password for phpmyadmin, enter secret and press Enter. 
	* When prompted for Password confirmation, enter secret again and press Enter.

3. Create and config site for nginx

	```bash
	cd /etc/nginx/sites-available
	sudo cp homestead.app phpmyadmin.app
	sudo sed -i 's/homestead.app/phpmyadmin.app/g' /etc/nginx/sites-available/phpmyadmin.app
	sudo sed -i 's/home\/vagrant\/Code\/Laravel\/public/usr\/share\/nginx\/html\/phpmyadmin/g' /etc/nginx/sites-available/phpmyadmin.app
	```

	Change the server root directive to `/usr/share/phpmyadmin`

	```bash
	vim phpmyadmin.app
	```


#### Variant 2

1. Install a [LAMP](http://en.wikipedia.org/wiki/LAMP_%28software_bundle%29) stack

2. Configure Apache

	Let apache serve the app from the public directory

3. Install [Composer](https://getcomposer.org/)

	[Getting started](https://getcomposer.org/doc/00-intro.md)

	#### Let's compose!

	If globally installed

	```bash
	composer install
	```

	else

	```bash
	php composer.phar install
	```



## Laravel PHP Framework

[![Build Status](https://travis-ci.org/laravel/framework.svg)](https://travis-ci.org/laravel/framework)
[![Total Downloads](https://poser.pugx.org/laravel/framework/downloads.svg)](https://packagist.org/packages/laravel/framework)
[![Latest Stable Version](https://poser.pugx.org/laravel/framework/v/stable.svg)](https://packagist.org/packages/laravel/framework)
[![Latest Unstable Version](https://poser.pugx.org/laravel/framework/v/unstable.svg)](https://packagist.org/packages/laravel/framework)
[![License](https://poser.pugx.org/laravel/framework/license.svg)](https://packagist.org/packages/laravel/framework)

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable, creative experience to be truly fulfilling. Laravel attempts to take the pain out of development by easing common tasks used in the majority of web projects, such as authentication, routing, sessions, and caching.

Laravel aims to make the development process a pleasing one for the developer without sacrificing application functionality. Happy developers make the best code. To this end, we've attempted to combine the very best of what we have seen in other web frameworks, including frameworks implemented in other languages, such as Ruby on Rails, ASP.NET MVC, and Sinatra.

Laravel is accessible, yet powerful, providing powerful tools needed for large, robust applications. A superb inversion of control container, expressive migration system, and tightly integrated unit testing support give you the tools you need to build any application with which you are tasked.

## Official Documentation

Documentation for the entire framework can be found on the [Laravel website](http://laravel.com/docs).

### Contributing To Laravel

**All issues and pull requests should be filed on the [laravel/framework](http://github.com/laravel/framework) repository.**

### License

The Laravel framework is open-sourced software licensed under the [MIT license](http://opensource.org/licenses/MIT)
