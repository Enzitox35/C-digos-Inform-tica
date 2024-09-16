let express = require('express');


let miApp = express();


//contenido estatico->dentro de la carpeta html
miApp.use(express.static("html"));


//contenido dinamico, usamos el motro EJS->dentro de la carpeta views
miApp.set("view engine", "ejs");


//inicializar servidor
miApp.listen(3000, function(){
   console.log("Servidor inicializado en puerto 3000");
});


miApp.get("/pruebaDinamica",function(pedido, respuesta){
   respuesta.render("htmldinamico",{nombreUsuario: "Leo Messi"});
})


//este metodo lo llamamos con un fetch de manera asincrona
miApp.get("/recuperarDatos",function(pedido, respuesta){
   respuesta.render("htmlRecuperarDatos",{direccion: "Av. Lastra nro 100", email:"aa@b.com",telefono:"444-555"});
})
