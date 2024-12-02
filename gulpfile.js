var gulp 					= require('gulp');
var sass 					= require('gulp-sass')(require('node-sass'));
var browserSync 			= require('browser-sync').create();
var rename 					= require('gulp-rename');
var autoprefixer 			= require('gulp-autoprefixer');
var imagemin 				= require('gulp-imagemin');
var inlineSource 			= require('gulp-inline-source');
var concatCss 				= require('gulp-concat-css');
var minifyCss				= require('gulp-clean-css');
var concatJs				= require('gulp-concat');
var minifyJs				= require('gulp-uglify-es').default;
var pug 					= require('gulp-pug');
var babel					= require('gulp-babel');

// single tasks

gulp.task('img', function() {
	return gulp.src('./images/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./docs/imgDub/'));
});

gulp.task('inlineSource', function() {
	return gulp.src('*.html')
		.pipe(inlineSource())
		.pipe(gulp.dest('./docs/'));
});



// complex tasks

gulp.task('sass', function(done) {
	return gulp.src('./sass/*.sass')
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./docs/css/'))
		.pipe(browserSync.stream());

	done();
});

gulp.task('views', function(done) {
	return gulp.src([
		'./views/*.pug'
		])
		.pipe(pug({
			pretty: true
		}))
		.pipe(gulp.dest('./docs'));

	done();
});

gulp.task('scripts', function(done) {
	return gulp.src([
		'./libs/jquery-3.6.0.min.js',
		'./libs/jquery.mask.min.js',
		'./libs/fancybox.umd.js',
		'./libs/swiper-bundle.min.js',
		'./libs/air-datepicker.js',
		'./libs/simplebar.min.js',
		'./libs/choices.min.js',
		'./libs/common.js',
		'./libs/custom.js'
		])
		.pipe(concatJs('apps.js'))
		.pipe(minifyJs())
		.pipe(gulp.dest('./docs/js/'));

	done();
});

gulp.task('server', function(done) {
	browserSync.init({
        server: {
            baseDir: "docs/"
        }
    });
	gulp.watch("./sass/*.sass", gulp.series('sass'));
	gulp.watch("./views/**/*.pug", gulp.series('views')).on('change', browserSync.reload);
	gulp.watch("./libs/*.js", gulp.series('scripts')).on('change', browserSync.reload);
  	gulp.watch("./docs/*.html").on('change', browserSync.reload);

	done();
});

gulp.task('default', gulp.series('server', 'sass', 'views', 'scripts'));
