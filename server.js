const http = require("http");

const port = 5000;

const todos = [
  {
    id: 1,
    text: "Todos one",
  },
  {
    id: 2,
    text: "Todos two",
  },
];

const server = http.createServer((req, res) => {
  /* console.log(req);
  const { headers, url, method } = req;
  console.log(headers, url, method); */

  const { method, url } = req;
  let body = [];

  req
    .on("data", (chunk) => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      // console.log(body);

      let status = 404;
      const response = {
        success: false,
        data: null,
        error: null,
      };

      if (method === "GET" && url === "/todos") {
        status = 200;
        response.success = true;
        response.data = todos;
      } else if (method === "POST" && url === "/todos") {
        const { id, text } = JSON.parse(body);

        if (!id || !text) {
          status = 400;
          response.error = "Please add id and text";
        } else {
          todos.push({ id, text });
          status = 201;
          response.success = true;
          response.data = todos;
        }
      }

      res.writeHead(status, { "Content-Type": "application/json" });
      /*  res.write("Hello backend is here."); */

      res.end(JSON.stringify(response));
    });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
