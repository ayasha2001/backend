const fs = require("fs");

const routesHandler = (req, res) => {
  if (req.url === "/") {
    res.write("<html>");
    res.write(
      '<form action="/message" method="POST"><input type="text" name="message"/> <button type="submit">send</button></form>'
    );
    res.write("</html>");
    return res.end();
  }
  if (req.url === "/message" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedbody = Buffer.concat(body).toString();
      const message = parsedbody.split("=")[1];
      fs.writeFileSync("message.txt", message);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
};

module.exports = routesHandler;
