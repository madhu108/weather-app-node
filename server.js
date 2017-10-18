const express = require('express');

const port = process.env.PORT || 3000;
var app = express();

app.use(express.static(__dirname + '/public'));

app.listen(port, (req, res) => {
	console.log('server is on port 3000');
});