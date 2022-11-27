const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const dotenv = require("dotenv");
const routeUrls = require("./routes/userRoutes");
const Usermodel = require("./models/users");
const cors = require("cors");

dotenv.config();

app.use(express.json());
app.use(cors());
app.use("/app", routeUrls);

// mongoose.connect(process.env.DATABASE_ACCESS, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => console.log("Connection to MongoDB successfull..."))
//     .catch((err) => console.log("Unable to connect to MongoDB...", err));

// const mongoDBstore = new MongoDBStore({
//   uri: process.env.DATABASE_ACCESS,
//   collection: "localSessions",
// });

app.get("/getusers", (req, res) => {
  Usermodel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.get("/search", async (req, res) => {
  const query = req.query.query;
  const researchArea = req.query.researchAreaSelection;

  console.log({ query, researchArea });
  /**submittedQuery
   * insert this search query to a mongoose table => history
   *
   * fetch data from elastic with the help of python script
   * send the data to the UI.
   *submittedQuery**/
  res.json([
    {
      link: "http://www.google.com/1/",
      documentTitle: "ssd1",
    },
    {
      link: "http://www.google.com/2/",
      documentTitle: "ssd2",
    },
    {
      link: "http://www.google.com/3/",
      documentTitle: "ss3",
    },
    {
      link: "http://www.google.com/4/",
      documentTitle: "Doc 4",
    },
    {
      link: "http://www.google.com/5/",
      documentTitle: "Doc 5",
    },
  ]);
});

app.post("/createuser", async (req, res) => {
  const user = req.body;
  const newuser = new Usermodel(user);
  await newuser.save();
  res.json(user);
});

app.listen(3001, () => {
  console.log("server_runs_perfectely");
});
