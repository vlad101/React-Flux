'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect'); // Runs a local dev server
var open = require('gulp-open'); // Open a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var reactify = require('reactify'); // Transforms React JSX to JS
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat'); // Concatenate files
var lint = require('gulp-eslint'); // Lint JS files, including JSX

var config = {
	port: 9000,
	devBaseUrl: 'http://localhost',
	paths: {
		html: './src/*.html',
		js: './src/**/*.js',
		images: './src/images/*',
		css: [
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
			'node_modules/toastr/toastr.css'
		],
		mainJs: './src/main.js',
		dist: './dist'
	}
}

// Start a local development server
gulp.task('connect', function() {
	connect.server({
		root: ['dist'],
		port: config.port,
		base: config.devBaseUrl,
		livereload: true
	})
});

// Run open task after connect
gulp.task('open', ['connect'], function() {
	gulp.src('dist/index.html')
		.pipe(open({uri: config.devBaseUrl + ':' + config.port + '/'}));
});

// Move files from src to dist folder
gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

// Watch for js file changes, transform JSX, bundle as one file. migrate js to dist folder, reload 
gulp.task('js', function() {
	browserify(config.paths.mainJs)
		.transform(reactify)
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload())
});

// Watch for css file changes, migrate css to dist folder
gulp.task('css', function() {
	gulp.src(config.paths.css)
	.pipe(concat('bundle.css'))
	.pipe(gulp.dest(config.paths.dist + '/css'))
});

// Watch for image file changes, migrate images to dist folder
gulp.task('images', function() {
	gulp.src(config.paths.images)
	.pipe(gulp.dest(config.paths.dist + '/images'))
	.pipe(connect.reload());

	// publish favicon
	gulp.src('./src/favicon.ico')
		.pipe(gulp.dest(config.paths.dist));
});

// Set rules
gulp.task('lint', function() {
	return gulp.src(config.paths.js)
			.pipe(lint({config: 'eslint.config.json'}))
			.pipe(lint.format())
});

// Watch for html file changes and reload
gulp.task('watch', function() {
	gulp.watch(config.paths.html, ['html']);
	gulp.watch(config.paths.js, ['js', 'lint']);
});

// Run html and open tasks by default
gulp.task('default', ['html', 'js', 'css', 'images', 'lint', 'open', 'watch']);