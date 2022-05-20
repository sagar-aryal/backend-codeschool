const http = require("http");

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
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  /*  res.write("Hello backend is here."); */
  res.end(
    JSON.stringify({
      success: true,
      data: todos,
    })
  );
});

const port = 5000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
