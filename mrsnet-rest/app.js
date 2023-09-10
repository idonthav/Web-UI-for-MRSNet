const express = require("express");
const cors = require("cors");
const app = express();
const mrsnet = require("./routes/mrsnet");
const config = require("./config");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/", mrsnet);

app.post("/login", (req, resp) => {
  const { username, password } = req.body;
  const user = config.users.find((user) => {
    return user.username === username && user.password === password;
  });
  if (user) {
    resp.send({
      code: 200,
      message: "Login successfully",
    });
  } else {
    resp.send({
      code: 500,
      message: "Login failed",
    });
  }
});

app.listen(config.port, () => {
  console.log("Satrt successfully: http://localhost:" + config.port);
});
