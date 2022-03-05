const gulp = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const browserSync = require("browser-sync").create();

const { task, src, dest, watch, series } = gulp;

const path = {
    scss: {
        src: ["resources/scss/**/*.scss"],
        public: ["public/assets/css"],
        build: ["build/assets/css"],
    },
    html: "public/**/*.html",
};

task("scss", () => {
    return src(path.scss.src)
        .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
        .pipe(
            postcss([
                autoprefixer({ overrideBrowserslist: ["last 2 versions"] }),
            ])
        )
        .pipe(dest(path.scss.public))
        .pipe(browserSync.stream());
});

exports.default = function () {
    browserSync.init({
        server: "./public",
    });

    watch(path.scss.src, series(["scss"]));
    watch(path.html).on("change", browserSync.reload);
};
