const gulp = require('gulp');
const browserSync = require('browser-sync');
const PATH = require('path');

const ROOT = './';
const PUBLIC_FOLDER = PATH.resolve(__dirname, ROOT, 'dist/');

gulp.task('browserSync', function() {
    browserSync.init({
        browser: [],
        notify: false,
        online: false,
        logConnections: true,
        files: [
            PUBLIC_FOLDER
        ],
        server: {
            baseDir : ROOT
        }
    });
    browserSync.reload();
});
