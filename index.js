const express = require('express'); // Framework cho API
const bodyParser = require('body-parser'); // Dung de chuyen doi du lieu
const mongoose = require('mongoose'); // Thu vien de su dung Database (MongoDB)
const app = express(); // dinh nghia API app su dung ExpressJs

const MONGO_URL = "mongodb+srv://admin:admin123@learnit.ect7p.mongodb.net/testdb"; // link truy cap Database

app.use(bodyParser.urlencoded({ extended: true })) // lay du lieu dang urlencoded
app.use(bodyParser.json()) // lay du lieu dang JSON
app.get('/', (req, res) => {
  res.json({"message": "Welcome to Note Manager API"});
}); // Dinh nghia route "/"

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database: ', err);
  process.exit();
}); // Su dung mongoose de connect den Database

// listen for requests
require('./app/modules/note/router')(app); // lang nghe request den cac route cua model

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
}); // lang nghe request o port 3000
