// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;
  let date;
  if (!dateString) {
    date = new Date();
  } else {
    if (!dateString.includes("-") && dateString.length === 13) {
      let numericDate = parseInt(dateString);
      if (isNaN(numericDate)) {
        date = new Date(dateString);
      } else {
        date = new Date(parseInt(dateString));
      }
    } else {
      date = new Date(dateString);
    }
  }

  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else {
    console.log("DATE", date.getTime());
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
