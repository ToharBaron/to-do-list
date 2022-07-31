const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + '/date.js');

const app = express();

const items = [];
const workItem = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {

const day = date.getDate();

  res.render('list', {
    listTitle: day,
    newListItems: items
  });

});

app.post("/", function(req, res) {
  const item = req.body.newItem;
  console.log(req.body);
  if (req.body.list === "Work List") {
    if (req.body.newItem === "") {
      res.redirect("/work");
    } else {
      workItem.push(item);
      res.redirect("/work");
    }
  } else {
    if (req.body.newItem === "") {
      res.redirect("/");
    } else {
      items.push(item);
      res.redirect("/");
    }
  }
});

app.get("/work", (req, res) => {
  res.render('list', {
    listTitle: "Work List",
    newListItems: workItem
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
