const connetToMongo=require("./db");
connetToMongo();
const express = require('express')
var cors = require('cors')
const app = express()
//To use json files 
app.use(express.json());
app.use(cors())
//Available Routes to link the routes by app.use
app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(5000, () => {
  console.log('app listening on port 3000')
})