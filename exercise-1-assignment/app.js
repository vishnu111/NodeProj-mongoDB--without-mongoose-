//Assignment 1
const http = require("http");
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html><head>Form</head>");
    res.write(
      '<body><form action="/create-user" method="POST" ><input type="text" name="username" ><button type="submit">Submit</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/users") {
    res.write("<html><head>hey</head><body><p>user 1 </p></body></html>");
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const user = [];
    req.on("data", (chunk) => {
      user.push(chunk);
    });
    return req.on("end", () => {
      const printableUser = Buffer.concat(user).toString();
      console.log(printableUser);
    });
  }
});
server.listen(3000);
