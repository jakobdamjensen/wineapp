/// <binding />
var gulp = require('gulp');
require('es6-promise').polyfill();
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var importCss = require('gulp-import-css');
var sizereport = require('gulp-sizereport');
var autoprefixer = require('gulp-autoprefixer');

var nodeBrowserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

var browserSync = require('browser-sync').create();

var plumber = require('gulp-plumber');

var replace = require('gulp-replace');
var run = require('gulp-run');
var gulpSequence = require('gulp-sequence');

gulp.task('sass', function () {
	return gulp.src('./client/scss/main.scss')
		.pipe(plumber({
			errorHandler: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(sass())
		.pipe(importCss())
		.pipe(autoprefixer())
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream());
});

gulp.task('sizereport', function () {
	return gulp.src(['./css/*', './js/*'])
		.pipe(sizereport({
			gzip: true
		}));
});

gulp.task('watch', function () {
	watch(['client/scss/*.scss', 'client/scss/**/*.scss'], function () {
		gulp.start('sass');
	});

	watch(['client/js/*.js', 'client/js/**/*.js'], function () {
		gulp.start('build-client-js');
	});

	gulp.watch(['js/*.js', 'js/**/*.js']).on('change', browserSync.reload);
});

gulp.task('build-client-js', function () {
	var b = nodeBrowserify({
		entries: './client/js/app.js',
		debug: true,
		'transform': [
			[
				'babelify',
				{
					'presets': ['es2015']
				}
			]
		]

	});

	return b.bundle()
		.on('error', function (err) {
			console.log(err.message);
			this.emit('end');
		})
		.pipe(source('app.js'))
		.pipe(gulp.dest('./js'));
});

gulp.task('browser-sync', function () {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});
});


gulp.task('serve', gulpSequence('sass', 'build-client-js', ['browser-sync', 'watch']));