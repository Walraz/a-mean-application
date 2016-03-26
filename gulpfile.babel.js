import gulp     from 'gulp';
import run      from 'run-sequence';
import server   from 'gulp-live-server';
import rimraf   from 'rimraf';
import shell    from 'gulp-shell';

let express;
const paths = {
  js: './src/**/*.js',
  dest: './app'
}

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

gulp.task('server', ()=>{
  express = server.new(paths.dest + '/app.js');
});

gulp.task('restart', ()=>{
  express.start.bind(express)();
});

gulp.task('watch', ()=>{
  gulp.watch(paths.js, ['build']);
});
