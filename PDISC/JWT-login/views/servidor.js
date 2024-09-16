const express = require('express');
const jwt = require('jsonwebtoken');


const app = express();


//contenido estatico->dentro de la carpeta html
app.use(express.static("html"));


//contenido dinamico, usamos el motro EJS->dentro de la carpeta views
app.set("view engine", "ejs");

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
app.get("/login/:user?/:password?", (req, res) => {
   // Validate User Here
   //const { username, password } = req.body;

   const userText = req.params.user;
   const pwdText = req.params.password;
   console.log(req.params);
 const user = users.find(u => u.username === userText && u.password === pwdText);
    //if user exists
   if(user){
       // Then generate JWT Token
       let jwtSecretKey = JWT_SECRET_KEY;
       let data = {
           time: Date(),
           userId: user.id,
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
