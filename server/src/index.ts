import express from "express";
import "./db.js";

const app = express();
const PORT = 3001;

// A minimal first route, just to prove the server actually runs and
// responds. Real data endpoints come once there's a database behind them.
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
