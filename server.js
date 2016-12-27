//Using express web http framework
var express = require("express");
//Using moment module
var moment = require("moment");
var app = express();

//Binding middleware to server object to recieve request to the path 
app.use('/:dateStr', function(request, response) {
	request.on('error', function(error) {
		return console.log("Improper request, error occured : ", error);
	});
	response.on('error', function(error) {
		return console.log("Error occured in sending response: ", error);
	});

	var dateStr = request.params.dateStr.toString();

	//check dateStr wheather is not-A-number
	if (!isNaN(dateStr)) {

		var time = Number(dateStr);

		if (moment.unix(time).isValid()) {
			var naturalDate = moment.unix(time);
			//Create a natural date out of unix timestamp
			var unixTime = moment(time).format("X");

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
		if (moment(dateStr, "MM D, YYYY").isValid()) {
			var naturalDate = moment(dateStr, "MM D, YYYY");
			//Create a natural date out of unix timestamp
			var unixTime = moment(naturalDate).format("X");

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

//moment is a wrapper around the 'Date' object
/*var d = new Date('6 jan 1990 12:13:13 UTC');
console.log(moment(d, "DD MM YYYY"));
console.log(moment(d).isValid());
*/
