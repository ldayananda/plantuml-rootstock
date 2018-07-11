const fs = require('fs');
const gulp = require('gulp');
const plantuml = require('node-plantuml');

const watch = () => {
  console.log('watching');
  const watcher = gulp.watch('files/*.plantuml');

  watcher.on('change', function(file) {
    const generated = plantuml.generate(file.path);
    const newFilePath = `${file.path}.png`;

    console.log(`writing to ${newFilePath}`);
    generated.out.pipe(fs.createWriteStream(newFilePath));
  });
};

gulp.task('default', watch);
