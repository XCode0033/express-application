const express = require("express");
const app = express();
const PORT = 3000;

// 1. Middleware (The "Plumbing")
app.use(express.json()); // Reads JSON body
app.use(express.urlencoded({ extended: true })); // Reads Form body

// 2. Routes (The "Traffic Control")
app.use("/api/schedules", require("./routes/schedules"));

// 3. Default Route (To see if it works)
app.get("/", (req, res) => {
  res.send("Sharp Schedule API is running correctly!");
});

// 4. Error Handling (The "Safety Net")
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
