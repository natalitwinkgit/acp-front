const { build } = require('next/dist/build');

build(process.cwd()).catch(e => {
  console.error(e.stack);
  process.exit(1);
});
