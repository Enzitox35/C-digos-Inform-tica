const express = require('express');


const cors = require('cors');


const app = express();


// Enable CORS for all routes
app.use(cors());


app.listen(3000, () => {
   console.log(`Server is up and running on port 3000 ...`);
});


const data = [
   { name: "Claudio", age: 25 },
   { name: "Miguel", age: 30 },
   { name: "Carlos", age: 35 },
 ];


app.get("/data", function(req,res){
   return res.send(data);
})
