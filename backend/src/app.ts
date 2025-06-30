import express from "express";
import activityRoutes from "./routes/activity";
import profilesRoutes from "./routes/profiles";
import alertsRoutes from "./routes/alerts";
import { simulateActivity } from "./jobs/simulator";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const APP_PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/", activityRoutes);
app.use("/", profilesRoutes);
app.use("/", alertsRoutes);

setInterval(simulateActivity, 60 * 1000);

if (process.env.NODE_ENV !== "test") {
  app.listen(APP_PORT, () => {
    console.log(`✅ Server running on http://localhost:${APP_PORT}`);
  });
}

export { app };
