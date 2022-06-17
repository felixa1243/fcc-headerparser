// index.js
// where your node app starts

// init project
require('dotenv').config();
const requestIp=require('request-ip')
var express = require('express');
const ipMiddleware=(req,res,next)=>{
	const clientIp=requestIp.getClientIp(req)
	next()
}

var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
app.use(requestIp.mw())
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/whoami", function (req, res) {
  res.json({
	  ipaddress:req.clientIp,
	  language:req.acceptsLanguages()[0],
	  software:req.get('User-Agent')
  })
});



// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
