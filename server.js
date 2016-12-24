var express = require("express");
var app = express();

app.use(function(req, res) {
	res.write('Hello World!', 'utf8', function(err) {
		if (err) {
			console.log(err);
		}
	});
	res.end();
});

app.listen(Number(8080));
