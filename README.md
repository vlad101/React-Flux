========
Run App
========

- $ git clone https://github.com/vlad101/React-Flux.git
- $ cd /path/to/app
- $ npm install

==================
Environment setup
==================

- Install Node.js, Gulp
	- $ npm init
	- $ npm install -g --save gulp@3.9.0 gulp-connect@2.2.0 gulp-open@1.0.0 

- Install Browserify, Reactify, Vinyl-source
	- $ npm install --save browserify@11.0.1 reactify@1.1.1 vinyl-source-stream@1.1.0

- Install Bootstrap, jQuery
	- $ npm install --save bootstrap@3.3.5 jquery@2.1.4 gulp-concat@2.6.0

- Install Eslint
	- $ npm install --save gulp-eslint@0.15.0

- Install React
	- $ npm install --save react@0.13.3 react-router@0.13.3 flux@2.0.3

- Set up gulp config
	- $ cd /path/to/app && mkdir dist src
	- create gulpfile.js and populate it with gulp tasks

- On error
	- $ npm cache clean
	- npm install -g <package> or npm install <package>