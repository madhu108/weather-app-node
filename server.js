const express = require('express');

const port = process.env.PORT || 3500;
var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(port, (req, res) => {
	console.log('server is on port 3500');
});