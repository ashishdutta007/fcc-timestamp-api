//Using express web http framework
var express = require("express");
//Using moment module (for date time related thongs)
var moment = require("moment");
var app = express();
var port = process.env.PORT || 3000;

console.log(__dirname + '/views');
app.use(express.static(__dirname + '/views'));

//Binding middleware to server object to recieve request to the path
///:dateStr -- named variable in the path, its value can be retrieved from [req.params.dateStr] 
app.get('/:dateStr', function(request, response) {
    //Handle errors
    request.on('error', function(error) {
        return console.log("Improper request, error occured : ", error);
    });
    response.on('error', function(error) {
        return console.log("Error occured in sending response: ", error);
    });

    //Retrieving date from request
    var dateStr = request.params.dateStr;

    //Check if 'dateStr' is not-A-number
    if (!isNaN(dateStr)) {
        console.log("It is a Number");
        var time = Number(dateStr);
        //define @ the beginning, returns a moment object
        //var naturalDate = moment();
        //var unixTime = moment();

        if (moment.unix(time).isValid()) {
            //console.log(moment().format());
            //var unixTime = moment(time, "X");
            var unixTime = time;
            console.log("unixTime", unixTime);
            //Create a natural date out of unix timestamp
            var naturalDate = moment.unix(time).format("MMM DD, YYYY");
            console.log("naturalDate", naturalDate);

            response.json({
                "unix": unixTime,
                "natural": naturalDate
            });
            response.end();
        } else {
            response.json({
                "unix": null,
                "natural": null
            });
            response.end();
        }
    } else {

        console.log(moment(dateStr).isValid());

        //Checking validity of 'dateStr' string
        if (moment(dateStr).isValid()) {
            console.log("moment(dateStr) -- ", moment(dateStr));
            var unixTime = moment(dateStr).format("X");
            //var unixTime = moment(naturalDate , "X");
            //Create a natural date out of unix timestamp
            var naturalDate = moment.unix(unixTime).format("MMM DD, YYYY");
            response.json({
                "unix": unixTime,
                "natural": naturalDate
            });
            response.end();
        } else {
            response.json({
                "unix": null,
                "natural": null
            });
            response.end();
        }
    }
});

app.listen(port, function() {
    console.log('app listening on port ' + port);
});


//moment is a wrapper around the 'Date' object
/*var d = new Date('6 jan 1990 12:13:13 UTC');
console.log(moment(d, "DD MM YYYY"));
console.log(moment(d).isValid());
*/
