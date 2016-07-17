require('babel-core/register');

var gulp = require('gulp');
var babel = require('gulp-babel');


gulp.task('babel', function() {

    return gulp.src('src/**/*.*')
        .on('error', function(err) {
            console.log('Babel server:', err.toString());
        })
        .pipe(babel())
        .pipe(gulp.dest('dist/'))
        .on('end',function() {
            console.log("transpile finish");
        });
});


gulp.task('default', ['babel']);
