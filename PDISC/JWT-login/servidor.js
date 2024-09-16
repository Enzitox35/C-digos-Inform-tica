const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mariadb');

const app = express();

//contenido estatico->dentro de la carpeta html
app.use(express.static("html"));

//contenido dinamico, usamos el motro EJS->dentro de la carpeta views
app.set("view engine", "ejs");




const pool = mysql.createPool({
    host: 'localhost',
    user:'root',
    database:'biblioteca',
    password: '',
    connectionLimit: 5,
    port:3306
});


app.listen(3000, () => {
   console.log(`Server is up and running on port 3000 ...`);
});

const JWT_SECRET_KEY="gfg_jwt_secret_key";
const TOKEN_HEADER_KEY="gfg_token_header_key";

// Mock user data
const users = [
   { id: 1, username: 'user1', password: '1' },
   { id: 2, username: 'user2', password: '2' }
 ];

// Main Code Here //
// Generating JWT
app.get("/login/:user?/:password?", async (req, res) => {
   // Validate User Here
   //const { username, password } = req.body;

   const userText = req.params.user;
   const pwdText = req.params.password;
   console.log(req.params);
 //const user = users.find(u => u.username === userText && u.password === pwdText);
 const existe = await asyncFunction(userText,pwdText);
 console.log("existe",existe);
    //if user exists
   if(existe>0){
       // Then generate JWT Token
       let jwtSecretKey = JWT_SECRET_KEY;
       let data = {
           time: Date(),
           userId: userText,
       }
  
       const token = jwt.sign(data, jwtSecretKey);
  
       res.send(token);


   }else{
       // Access Denied
       return res.status(401).send("Usuario invalido");
   }
});

// Middleware to verify token
const authenticateToken = (req, res, next) => {
   let tokenHeaderKey = TOKEN_HEADER_KEY;
   let jwtSecretKey = JWT_SECRET_KEY;
   try {
       const token = req.header(tokenHeaderKey);
       console.log(token);


       const verified = jwt.verify(token, jwtSecretKey);
       if (verified) {
           next();
       } else {
           // Access Denied
           return res.status(401).send(error);
       }
   } catch (error) {
       // Access Denied
       return res.status(401).send(error);
   }
 };

 // Protected route
app.get('/inicio/:user?', authenticateToken, (req, res) => {
   const usuarioLogueado= req.params.user;
   res.render("inicio",{usuario:usuarioLogueado});
 });



async function asyncFunction(usuario, password) {
   console.log("asyncFunction")
 let conn;
 try {
 conn = await pool.getConnection();
   console.log("pool");
 const rows = await conn.query("SELECT count(*) as cant from biblioteca.usuario where Nombre=? and Contrasena=?",[usuario,password]);
   console.log("query");
 //console.log(rows); //[ {val: 1}, meta: ... ]
   //Print list of contacts
   for (i = 0; i < rows.length; i++) {
       console.log("rows.cant",`${rows[i].cant}`);
    }
 //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    console.log("return")
   return rows[0].cant;
 } catch (err) {
 throw err;
 } finally {
 if (conn) conn.close();
   console.log("finally")
 }
}


