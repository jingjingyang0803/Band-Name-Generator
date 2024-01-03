import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Get the current directory name using dirname and fileURLToPath
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
var bandName = "";

// Use the body-parser middleware to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware function to generate a band name from form data
function bandNameGenerator(req, res, next) {
  console.log(req.body);
  // Generate a band name by combining "street" and "pet" fields from the form
  bandName = req.body["street"] + req.body["pet"];
  next(); // Continue to the next middleware or route
}

app.use(bandNameGenerator); // Use the bandNameGenerator middleware

// Define a route to handle GET requests to the root path "/"
app.get("/", (req, res) => {
  // Send the index.html file located in the current directory
  res.sendFile(__dirname + "/index.html");
});

// Define a route to handle POST requests to "/submit"
app.post("/submit", (req, res) => {
  // Send a response with the generated band name
  res.send(`<h1>Your band name is:</h1><h2>${bandName}✌️</h2>`);
});

// Start the Express server on the specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
