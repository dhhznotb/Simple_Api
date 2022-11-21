const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const MONGO_URL = "mongodb+srv://admin:admin123@learnit.ect7p.mongodb.net/testdb";

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.json({"message": "!"});
});

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database: ', err);
  process.exit();
});

// listen for requests
require('./app/modules/note/router')(app);
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
