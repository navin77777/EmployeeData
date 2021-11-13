const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/employeeDB", {
  useNewUrlParser: true,
});

const employeeSchema = {
  name: "String",
  gender: "String",
  age: "Number",
  designation: "String",
  department: "String",
  joining_date: "Date",
};

const Employee = mongoose.model("Employee", employeeSchema);

app.get("/employees", function (req, res) {
  Employee.find(function (err, foundEmployees) {
    if (!err) {
      res.send(foundEmployees);
    } else {
      res.send(err);
    }
  });
});

app.post("/employees", function (req, res) {
  console.log(req.body.name);

  const newEmployee = new Employee({
    name: req.body.name,
    gender: req.body.gender,
    age: req.body.age,
    designation: req.body.designation,
    department: req.body.department,
    joining_date: req.body.joining_date,
  });

  newEmployee.save(function (err) {
    if (!err) {
      res.send("Sucessfully added");
    } else {
      res.send(err);
    }
  });
});

app.delete("/employees", function (req, res) {
  Employee.deleteMany(function (err) {
    if (!err) {
      res.send("Deleted Sucessfully");
    } else {
      res.send(err);
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
