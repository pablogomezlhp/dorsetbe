const express = require('express');
const connectDB = require('./database/index');
const app = express();
const bodyParser = require('body-parser');

//Connecting to my Database 
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Creating a main route.
app.use('/project', require('./routes/user'));

//This Arrow function was created to make the server run on PORT 3333 
app.listen(3333, () => console.log('🚀 Server started on port 3333'));