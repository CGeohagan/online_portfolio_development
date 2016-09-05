

var gulp = require('gulp'),
	sass = require('gulp-sass'),
   cache = require('gulp-cache'),
cleanCSS = require('gulp-clean-css'),
 	 del = require('del'),
 deploy = require('gulp-gh-pages'),
  gulpIf = require('gulp-if'),
   image = require('gulp-image'),
 lazypipe = require('lazypipe'),
runSequence = require('run-sequence'),
sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  useref = require('gulp-useref');
	

gulp.task('sass', function(){
  return gulp.src('development/scss/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass()) // Using gulp-sass
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('development/css'))  
});

gulp.task('watch', ['sass'], function(){
  gulp.watch('development/scss/**/*.scss', ['sass']); 
  // Other watchers
});

gulp.task('useref', function() {
	return gulp.src('development/*.html')
		.pipe(useref())	
		// Minifies only if it's a Javascript file
		.pipe(gulpIf('*.js', uglify()))
		// Minifies only if it's a CSS file
		.pipe(gulpIf('*.css', cleanCSS({compatibility: 'ie8'})))
		.pipe(gulp.dest('dist'))
});

gulp.task('image', function() {
	return gulp.src('development/images/**/*')
		.pipe(cache(image({
	      pngquant: true,
	      optipng: false,
	      zopflipng: true,
	      jpegRecompress: true,
	      jpegoptim: false,
	      mozjpeg: false,
	      gifsicle: true,
	      svgo: false,
	      concurrent: 10
	    })))
		.pipe(gulp.dest('dist/images'))
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('default', function (callback) {
  runSequence('clean:dist', 'sass', ['useref', 'image'], callback);
});

var options = { 
    remoteUrl: "https://github.com/cgeohagan/cgeohagan.github.io.git",
    branch: "master"
};

gulp.task('deploy', function () {
    gulp.src("dist/**/*.*")
        .pipe(deploy(options));
});

//gulp.task('deploy', function(){
//	return gulp.src('dist/**/*')
//		.pipe(pages());
//});


