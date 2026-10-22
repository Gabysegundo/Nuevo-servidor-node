const http = require("http");
const fs = require("fs").promises;

const server = http.createServer(function (req, res) {
  if (req.url === "/mensaje" && req.method === "GET") {
    fs.readFile("mege.txt", "utf8")
      .then((data) => {
        res.statusCode = 200;
        res.end(data);
      })
      .catch((err) => {
        if (err.code === "ENOENT") {
          res.statusCode = 404;
          res.end("El archivo no fue encontrado");
        } else {
          res.statusCode = 500;
          res.end("Error interno al leer el archivo");
        }
      });
  } else if (req.url === "/mensaje" && req.method === "POST") {
    const nuevoContenido = "Este es el nuevo contenido generado por el POST";
    fs.writeFile("message.txt", nuevoContenido, "utf8");
    thEN(() => {
      res.statusCode = 201;
      res.end("la creacion del txt se proceso ocn exito");
    }).catch((err) => {
      if (err.code === "EACCES") {
        ((res.statusCode = 403), res.end("Error interno al crear el arcivo"));
      }
    });
  }
});

server.listen(0, function () {
  console.log(`Escuchando en el puerto ${server.address().port}`);
});
