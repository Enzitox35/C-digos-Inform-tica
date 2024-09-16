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

miApp.get("/dibujarTablero/:palabra?", function(req,resp){ 
    const palabra = req.params.palabra;
    resp.send(dibujarPalabra(palabra));
});

//------------------------------------------------------------------------------
let posicionGanadora = [];
        let posicionSeleccionada = [];
   
        function getRandomInt(max) {
          return Math.floor(Math.random() * max);
        }
   
        function getRandomLetter() {
          const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
          return chars.charAt(Math.floor(Math.random() * chars.length));
        }
   
        function dibujarPalabra(palabra) {
          //let palabra = document.querySelector("#palabra");
          let dibujo="";
          posicionGanadora = [];
          posicionSeleccionada = [];
          
          //uso un ancho fijo de 12 columnas
          let anchoTablero = 12;
   
          //el largo lo hago variable
          let largoTablero = palabra.length + getRandomInt(5);
          //console.log("largoTablero", largoTablero);
          
          //ubico la palabra escrita en el tablero ya pintado, en una posicion random!
          let anchoInicial = getRandomInt(anchoTablero);
          let largoInicial = getRandomInt(largoTablero - palabra.length);
          
          
          //armo el tablero en blanco
          let fila = "";
          let indicePalabra=0;
          for (let x = 0; x < largoTablero; x++) {
            fila = `<div class="row" fila='${x}'>`;
            for (let y = 0; y < anchoTablero; y++) {
              let letraRandom = getRandomLetter();
              const posicion = `_${x}_${y}`;
              
              if(x===largoInicial){
                letraRandom = palabra[indicePalabra];
                largoInicial = largoInicial + 1;
                console.log(`_${x}_${y}, ${palabra[indicePalabra]}`);
                indicePalabra++;
              }
              fila += `<div class="col"><span onclick="elijoLetra('${posicion}')" ><h1 class="letras" id="${posicion}">${letraRandom}</h1></span></div>`;
            }
   
            fila += `</div>`;
            dibujo += fila;
          }
     
          //const orientacionPalabra = getRandomInt(10);
          //console.log(anchoInicial, largoInicial);
          for (const letra of palabra) {
            //let posicion = `_${largoInicial}_${anchoInicial}`;
   
            //dibujarLetraEnPosicion(letra, posicion);
            //largoInicial = largoInicial + 1;
          }

          return dibujo;
        }

        function dibujarLetraEnPosicion(letra, posicion) {
          //console.log("dibujarLetraEnPosicion", letra, posicion);
          //document.querySelector(`#${posicion}`).innerHTML = letra;
          console.log(`${posicion}-${letra}`)
          posicionGanadora.push(posicion);
        }

        function pintarPosicion(posicion, color) {
          document.querySelector(`#${posicion}`).style.backgroundColor = color;
        }
      
        function elijoLetra(posicion) {
          pintarPosicion(posicion, "#00FFFF");
      
          //console.log(posicion);
          if (posicionGanadora.includes(posicion)) {
            posicionSeleccionada.push(posicion);
          }
          console.log(posicionSeleccionada, posicionGanadora);

          if (posicionSeleccionada.toString() === posicionGanadora.toString()) {
            mostrarMensaje("Encontraste la palabra!!");
            pintarPosicion("mensaje", "#7FFF00");
            posicionGanadora.forEach((posicion) => {
              pintarPosicion(posicion, "#7FFF00");
            });
          }
        }
   
        function mostrarMensaje(mensaje) {
          document.querySelector("#mensaje").innerHTML = mensaje;
        }

        function ganador() {}

//------------------------------------------------------------------------------