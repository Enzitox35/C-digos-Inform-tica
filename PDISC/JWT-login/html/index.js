let token;
     function mostrarError(error) {
       document.querySelector("#errores").innerHTML = error;
     }


     function mostrarContenido(paginaHTML) {
       mostrarError("");
       document.querySelector("#contenido").innerHTML = paginaHTML;
     }


     async function irA(miUrl) {
       try {
         // Define the request options
         const options = {
           method: "GET", // or 'POST', 'PUT', 'DELETE', etc.
           headers: {
             "Content-Type": "application/json",
             //Authorization: `Bearer ${token}`,
             gfg_token_header_key: `${token}`,
           },
         };


         console.log(options);
         const response = await fetch(miUrl, options);
         const rta = await response.text();
         console.log(rta);
         mostrarContenido(rta);
       } catch (error) {
         // Manejamos los errors que pudieran ocurrir en el fetch
         mostrarError(error);
       }
     }


     async function login() {
       // Hacemos un fetch request loguearnos
       try {
         const user = document.querySelector("#usuario").value;
         const password = document.querySelector("#password").value;
         if (user && password) {
           const response = await fetch(`login/${user}/${password}`);
           const rta = await response.text();
           console.log(rta);
           if(rta!=="Usuario invalido"){
             token = rta;
             //continuamos al inicio del sitio
             irA(`inicio/${user}`);
           } else {
            mostrarError("usuario y password incorrecto");
          }

         } else {
           mostrarError("ingrese usuario y password");
         }
       } catch (error) {
         // Manejamos los errors que pudieran ocurrir en el fetch
         mostrarError(error);
       }
     }
