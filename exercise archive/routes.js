const fs = require("fs");
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html><header><title>My input form</title></header>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message" ><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    //This function executes when there is some incoming data ready to be read : data event listener
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    //This function executes when we finish reading the incoming data
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];

      //About below function"writeFileSync"": There is also another method to write data into the file called "writeFile". But, this "writeFileSync" blocks the code execution untill the file is created.
      /*fs.writeFileSync("message.txt", message);*/

      //The below function does not stop the code execution unlike "writeFileSync". In the below function, once the write request is completed, the arrow function is called
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  //A way of telling browser that we are sending html type code
  res.setHeader("Content-Type", "text/html");
  res.write(
    "<html><header><title>Hey! This is a title from the Node</title></header><body><p>A short desc</p></body></html>"
  );
  //This is to end our write, we can have as many as write functions. But, they should be before end function, after res.end(), the write does not    execute
  res.end();
};
//Exporting the requestHandler function
module.exports = requestHandler;

//We can export multiple functions or values also

//one way:
/* module.exports={
    handler: requestHandler,
    someText: 'some value which we can import anywhere'
}*/
//another way:
/*module.exports.handler = requestHandler;
module.exports.someText= 'some value which we can import anywhere';
*/
//or (this is explicitly supported by node js)
/*exports.handler = requestHandler;
exports.someText= 'some value which we can import anywhere';*/
