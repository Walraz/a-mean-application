import gulp     from 'gulp';
import run      from 'run-sequence';
import server   from 'gulp-live-server';
import rimraf   from 'rimraf';
import shell    from 'gulp-shell';
import sass     from 'gulp-sass';
import sync     from 'browser-sync';

let express;

const paths = {
  js: './src/**/*.js',
  sass: './src/sass/**/*.scss',
  dest: './app'
}

gulp.task('browser-sync', function() {
    sync.init({
        proxy: "localhost:1337"
    });
});

gulp.task('default', ()=> {
  run('server', 'build', 'watch');
});

gulp.task('build', ()=>{
  run('clean', 'babel', 'restart');
});

gulp.task('clean', cb=>{
  rimraf(paths.dest, cb);
});

gulp.task('babel', shell.task([
  'babel src --out-dir app'
]));

gulp.task('sass', ()=>{
  return gulp
    .src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(sync.stream());
});

gulp.task('server', ()=>{
  express = server.new(paths.dest + '/app.js');
});

gulp.task('restart', ()=>{
  express.start.bind(express)();
});

gulp.task('watch', ['browser-sync'], ()=>{
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['build']);
});
