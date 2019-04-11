const gulp = require('gulp');
const minify = require('gulp-minify');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var lazypipe = require('lazypipe');
var useref = require('gulp-useref');

// gulp.task('client-script-compress', function () {
//   return gulp.src('public/appClient/index.html')
//       .pipe(useref({}, lazypipe().pipe(function() {
//           return gulpif(['**/*.js', '!**/*.min.js'], minify());
//       })))
//       .pipe(gulp.dest('dist'));
// });
 
// gulp.task('client-script-compress-1', function() {
//   gulp.src(['./assets/app.js'])
//     .pipe(minify())
//     .pipe(gulp.dest('dist'))
// });

// gulp.task('client-script-compress-1', function() {
//   return gulp.src('/dist/app.js')
//     .pipe(concat('foodtech1.js'))
//     // Minify the file
//     .pipe(uglify())
//     // Output
//     .pipe(gulp.dest('./dist'))
// });

gulp.task('client-script-compress', function () {
    return gulp.src('public/appClient/index.html')
        .pipe(useref())
        //.pipe(gulpif(['*.js', '!*.min.js'], minify()))
        // .pipe(minify())
        //.pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('default',['client-script-compress']);