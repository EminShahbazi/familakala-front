const gulp = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const babel = require("gulp-babel");
const browserSync = require("browser-sync").create();
const cssmin = require("gulp-clean-css");
const jsmin = require("gulp-uglify");
const gulpIf = require("gulp-if");
const rev = require("gulp-rev");
const revReplace = require("gulp-rev-replace");

const { task, src, dest, watch, series } = gulp;

const path = {
    scss: {
        src: ["resources/scss/**/*.scss"],
        public: ["public/assets/css"],
        build: ["build/assets/css"],
    },
    js: {
        src: ["resources/js/**/*.js"],
        public: ["public/assets/js"],
        build: ["build/assets/js"],
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

task("js", () => {
    return src(path.js.src)
        .pipe(
            babel({
                presets: ["@babel/env"],
            })
        )
        .pipe(dest(path.js.public));
});

// Build Tasks
task("moveImages", () => {
    return src(["public/assets/images/**.*", "public/uploads/**/**.*"], {
        base: "public",
    }).pipe(dest("build"));
});
task("moveFonts", () => {
    return src("public/assets/fonts/**.*").pipe(dest("build/assets/fonts"));
});

task("rev", () => {
    return src(["public/assets/css/*.css", "public/assets/js/*.js"], {
        base: "public/assets/",
    })
        .pipe(gulpIf("*.css", cssmin()))
        .pipe(gulpIf("*.js", jsmin()))
        .pipe(rev())
        .pipe(dest("build/assets"))
        .pipe(rev.manifest())
        .pipe(dest("build/assets"));
});

task("revReplace", () => {
    const manifest = src("build/assets/rev-manifest.json");

    return src("public/**/*.html")
        .pipe(
            revReplace({ manifest: manifest, replaceInExtensions: [".html"] })
        )
        .pipe(dest("build"));
});

task("build", series(["moveImages", "moveFonts", "rev", "revReplace"]));

// Default Task
exports.default = function () {
    browserSync.init({
        server: "./public",
    });

    watch(path.scss.src, series(["scss"]));
    watch(path.js.src).on("change", series(["js", browserSync.reload]));
    watch(path.html).on("change", browserSync.reload);
};
