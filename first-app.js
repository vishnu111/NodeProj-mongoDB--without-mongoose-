//Here, we are importing file system module
const fs = require("fs");

//With the help of file system, we are creating a file name "hello.txt" and writing  this "Writing this content to hello.txt with the help of fs(file system)" into it.
fs.writeFileSync(
  "hello.txt",
  "Writing this content to hello.txt with the help of fs(file system)"
);
