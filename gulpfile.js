const fs = require('fs');
const gulp = require('gulp');
const plantuml = require('node-plantuml');
const nomnoml = require('nomnoml');
// const mermaid = require('mermaid');

const watch = () => {
  console.log('watching');
  const watcher = gulp.watch('files/**/*.plantuml');

  watcher.on('change', function(file) {
    const generated = plantuml.generate(file.path);

    const newFilePath = `${file.path}.png`;

    console.log(`writing to ${newFilePath}`);
    generated.out.pipe(fs.createWriteStream(newFilePath));
  });
};

const watchNomnoml = () => {
  console.log('watching');
  const watcher = gulp.watch('files/**/*.nomnoml.txt');

  watcher.on('change', function (file) {
    const fileContents = fs.readFileSync(file.path, 'utf-8');

    const generated = nomnoml.renderSvg(fileContents);
    const newFilePath = `${file.path}.svg`;
    const outFile = fs.createWriteStream(newFilePath);

    console.log(`writing to ${newFilePath}`);
    outFile.write(generated);
  })
}

// const watchMermaid = () => {
//   console.log('watching');
//   mermaid.initialize({
//     flowchart: {
//       curve: "basis"
//     }
//   });

//   const watcher = gulp.watch('files/*.mermaid.txt');

//   watcher.on('change', function(file) {
//     const fileContents = fs.readFileSync(file.path, 'utf-8');

//     const cb = (generated) => {
//       const newFilePath = `${file.path}.svg`;
//       const outFile = fs.createWriteStream(newFilePath);

//       console.log(`writing to ${newFilePath}`);
//       outFile.write(generated);
//     };

//     mermaid.render('graphDiv', fileContents, cb);

//   });
// }

gulp.task('default', watch);
gulp.task('nom', watchNomnoml);
// gulp.task('mermaid', watchMermaid);
