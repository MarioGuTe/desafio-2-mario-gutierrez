const express = require("express");
const app = express();
const fs = require("fs");

app.listen(3000, () => {
  console.log("servidor funcionando");
});

app.use(express.json());

// ruta html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Agregar canción
app.post("/canciones", (req, res) => {
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("tabla.json"));
  canciones.push(cancion);
  fs.writeFileSync("tabla.json", JSON.stringify(canciones));
  res.send("canción agregada con éxito");
});

// Obtener/Leer las canciones desde el archivo .json
app.get("/canciones", (req, res) => {
  const canciones = JSON.parse(fs.readFileSync("tabla.json"));
  res.json(canciones);
});

// modificar/actualizar canciones ya ingresadas
app.put("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const cancion = req.body;
  const canciones = JSON.parse(fs.readFileSync("tabla.json"));
  const index = canciones.findIndex((c) => c.id == id);
  canciones[index] = cancion;
  fs.writeFileSync("tabla.json", JSON.stringify(canciones));
  res.send("canción modificada con éxito");
});

// borrar canción
app.delete("/canciones/:id", (req, res) => {
  const { id } = req.params;
  const canciones = JSON.parse(fs.readFileSync("tabla.json"));
  const index = canciones.findIndex((c) => c.id == id);
  canciones.splice(index, 1);
  fs.writeFileSync("tabla.json", JSON.stringify(canciones));
  res.send("Producto eliminado con éxito");
});
