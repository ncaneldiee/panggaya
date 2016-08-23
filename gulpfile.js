var gulp = require('gulp');
var gutil = require('gulp-util');
var guquence = require('gulp-sequence').use(gulp);
var bs = require('browser-sync');
var $ = require('gulp-load-plugins')();

var path = {
    app: './app/',
    bower: './bower_components/',
    node: './node_modules/',
    public: './public/'
};

gulp.task('default', guquence(['deploy', 'watch']));

gulp.task('deploy', guquence('clean', ['html', 'other', 'script', 'style']));

gulp.task('watch', function() {
    bs.create();

    bs.init({
        notify: false,
        server: path.public,
        open: 'local',
        ui: false
    });

    gulp.watch(path.public + '**/*').on('change', bs.reload);

    gulp.watch(path.app + 'pug/**/*.pug', ['html']);

    gulp.watch([path.app + 'fonts/**/*', path.app + 'images/**/*'], ['other']);

    gulp.watch(path.app + 'coffee/**/*.coffee', ['script']);

    gulp.watch(path.app + 'sass/**/*.{scss,sass}', ['style']);
});

gulp.task('clean', function() {
    gulp.src(path.public + '*', {
            read: false
        })
        .pipe($.clean());
});

gulp.task('html', function() {
    gulp.src([
            'app/*.*',
            'app/.*'
        ])
        .pipe($.plumber())
        .pipe(gulp.dest(path.public));

    gulp.src([
            path.app + 'pug/**/*.pug'
        ])
        .pipe($.plumber())
        .pipe($.pug({
            pretty: true
        }).on('error', function(err) {
            gutil.log(gutil.colors.red(err));
        }))
        .pipe(gulp.dest(path.public));
});

gulp.task('other', function () {
    gulp.src([
            path.app + 'fonts/**/*'
        ])
        .pipe($.plumber())
        .pipe(gulp.dest(path.public + 'fonts'));

    gulp.src(path.app + 'images/**/*')
        .pipe($.plumber())
        .pipe($.imagemin())
        .pipe(gulp.dest(path.public + 'images'));
});

gulp.task('script', function() {
    gulp.src([

        ])
        .pipe($.plumber())
        .pipe(gulp.dest(path.public + 'js/vendor'));

    gulp.src([

        ])
        .pipe($.plumber())
        .pipe($.concat('global.js'))
        .pipe(gulp.dest(path.public + 'js'))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.uglify())
        .pipe(gulp.dest(path.public + 'js'));

    gulp.src(path.app + 'coffee/**/*.coffee')
        .pipe($.plumber())
        .pipe($.coffee({
            bare: true
        }).on('error', function(err) {
            gutil.log(gutil.colors.red(err));
        }))
        .pipe($.concat('script.js'))
        .pipe(gulp.dest(path.public + 'js'))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.uglify())
        .pipe(gulp.dest(path.public + 'js'));
});

gulp.task('style', function () {
    gulp.src([

        ])
        .pipe($.plumber())
        .pipe($.autoprefixer())
        .pipe($.concat('global.css'))
        .pipe(gulp.dest(path.public + 'css'))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.cssmin())
        .pipe(gulp.dest(path.public + 'css'));

    gulp.src(path.app + 'sass/**/*.{scss,sass}')
        .pipe($.plumber())
        .pipe($.sass().on('error', function(err) {
            gutil.log(gutil.colors.red(err));
        }))
        .pipe($.autoprefixer())
        .pipe($.concat('style.css'))
        .pipe(gulp.dest(path.public + 'css'))
        .pipe($.rename({suffix: '.min'}))
        .pipe($.cssmin())
        .pipe(gulp.dest(path.public + 'css'));
});
