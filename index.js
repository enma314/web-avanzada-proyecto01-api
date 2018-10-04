const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //CUANDO EL BODY NoEx
const formData = require("express-form-data");
const os = require("os");
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({storage: storage});
// app.get('/', (req, res) => {
//   res.send('Hello World');
// });
// app.get('/', (req, res) => {
//   res.status(200).json({title: 'Hello World'});
// });
// app.get('/api/jobs', (req, res) => {
//   res.send([1, 2, 3])
// });

// app.post()
// app.put()
// app.delete()

//CONECTION TO MONGODB ONLINE
const connectMongoOnline = 'mongodb://admin:web2018@ds119490.mlab.com:19490/webproject01';
mongoose.connect(connectMongoOnline);
let db = mongoose.connection;
const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

// for parsing multipart/form-data
//app.use(upload.array()); 
app.use(upload.any());
app.use(express.static('uploads'));

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// parse application/json
app.use(bodyParser.json())

const jobsRoutes = require('./api/jobs/routes'); //IMPORT JOBS ROUTES
const usersRoutes = require('./api/users/routes'); //IMPORT USERS ROUTES 
const categoriesRoutes = require('./api/categories/routes'); 

jobsRoutes(app); //REGISTER ROUTE
usersRoutes(app); //REGISTER ROUTE
categoriesRoutes(app);

// PORT
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`))
