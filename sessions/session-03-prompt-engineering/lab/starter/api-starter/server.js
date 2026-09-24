const express = require("express");
const todoRoutes = require("./routes/todos");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/todos", todoRoutes);

app.get("/", (request, response) => {
  response.json({ name: "Todo API", health: "ok" });
});

app.listen(port, () => {
  console.log(`Todo API listening on http://localhost:${port}`);
});
