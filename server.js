//Using express web http framework
var express = require("express");
//Using moment module (for date time related thongs)
var moment = require("moment");
var app = express();
var port = process.env.port || 3000;

//Binding middleware to server object to recieve request to the path
///:dateStr -- named variable in the path, its value can be retrieved from [req.params.dateStr] 
app.use('/:dateStr', function(request, response) {
	//Handle errors
	request.on('error', function(error) {
		return console.log("Improper request, error occured : ", error);
	});
	response.on('error', function(error) {
		return console.log("Error occured in sending response: ", error);
	});

	//Retrieving date from request
	var dateStr = request.params.dateStr.toString();

	//Check if 'dateStr' is not-A-number
	if (!isNaN(dateStr)) {

		var time = Number(dateStr);
		//define @ the beginning, returns a moment object
		//var naturalDate = moment();
		//var unixTime = moment();

		if (moment.unix(time).isValid()) {
			var unixTime = moment(time, "X");
			//Create a natural date out of unix timestamp
			var naturalDate = moment(moment.unix(time), "MM DD, YYYY");

			response.json({
				"unix": unixTime,
				"natural": naturalDate
			});
			response.end();
		}
		else {
			response.json({
				"unix": null,
				"natural": null
			});
			response.end();
		}
	}
	else {
		//Checking validity of 'dateStr' string
		if (moment(dateStr, "MM DD, YYYY").isValid()) {
			var unixTime = moment(naturalDate).format("X");
			//var unixTime = moment(naturalDate , "X");
			//Create a natural date out of unix timestamp
			var naturalDate = moment(dateStr, "MM DD, YYYY");

			response.json({
				"unix": unixTime,
				"natural": naturalDate
			});
			response.end();
		}
		else {
			response.json({
				"unix": null,
				"natural": null
			});
			response.end();
		}
	}
});

app.listen(port, function() {
	console.log('app listening on port' + port);
});

//moment is a wrapper around the 'Date' object
/*var d = new Date('6 jan 1990 12:13:13 UTC');
console.log(moment(d, "DD MM YYYY"));
console.log(moment(d).isValid());
*/
