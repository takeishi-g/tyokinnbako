const express = require("express");
const app = express();
const mysql = require("mysql2");
const ejs = require("ejs");
const path = require("path");
const PORT = 3100;

app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "view"));
app.set("view engine", "ejs");

const con = mysql.createConnection({
  host: "localhost",
  port: "8889",
  user: "test",
  password: "test",
  database: "tyokinnbako",
  multipleStatements: true,
});

app.get("/", (req, res) => {
  con.query("select * from tyokin", (err_c, result_b,fields) => {
    if (err_c) throw err;
      console.log(result_b);
      
    con.query("select sum(okane) from tyokin", (err_r, result_a,fields) => {
      if (err_r) throw err;
        console.log(result_a);
      
      res.render("index", { content: result_a,data: result_b });
    });
  });
});


app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
