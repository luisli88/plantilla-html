var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var $ = require('gulp-load-plugins')()
var autoprefixer = require('autoprefixer')
var sourcemaps = require('gulp-sourcemaps')

var sassPaths = [
  'node_modules/foundation-sites/scss',
  'node_modules/motion-ui/src',
]

function sass() {
  return gulp
    .src('scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(
      $.sass({
        includePaths: sassPaths,
        outputStyle: 'compressed', // if css compressed **file size**
      }).on('error', $.sass.logError)
    )
    .pipe(
      $.postcss([autoprefixer({ browsers: ['last 2 versions', 'ie >= 9'] })])
    )
    .pipe(sourcemaps.write('css/maps'))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream())
}

function serve() {
  browserSync.init({
    server: './',
  })

  gulp.watch('scss/**.scss', sass)
  gulp.watch('scss/**/*.scss', sass)
  gulp.watch('./*.html').on('change', browserSync.reload)
  gulp.watch('pages/*.html').on('change', browserSync.reload)
  gulp.watch('modals/*.html').on('change', browserSync.reload)
}

gulp.task('sass', sass)
gulp.task('serve', gulp.series('sass', serve))
gulp.task('default', gulp.series('sass', serve))
