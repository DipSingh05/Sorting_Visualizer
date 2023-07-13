var http = require('http');
var url = require('url');
var express = require('express');
var path = require('path');
var app = express();
var router = express.Router();

// Add dynamic contents
app.use(express.static(__dirname));
var filePath = path.join(__dirname, '/public');
var style = path.join(__dirname, '/style');
var script = path.join(__dirname, '/script');
app.use(express.static(filePath));
app.use(express.static(style));
app.use(express.static(script));
app.use(express.json());



// Define Routers
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

router.get('/home', (req, res) => {
  res.sendFile(path.join(filePath + '/home.html'));
  res.status(200);
});

router.get('/sort', (req, res) => {
  res.sendFile(path.join(filePath + '/sort.html'));
  res.status(200);
});

router.get('/sorting.json', (req, res) => {
  res.status(200);
  console.log("res status is 200..");
})

router.post('/bubble', (req, res) => {
  const payload = req.body;
  console.log(payload);
  res.status(200).json(payload);
});


//add the router
app.use('/', router);
app.listen(process.env.port || 3000);


console.log('Running at Port 3000');
