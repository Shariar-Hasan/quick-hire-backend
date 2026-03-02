import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRouter from "./modules/user/user.router";
import locationRouter from "./modules/location/location.router";
import companyRouter from "./modules/company/company.router";
import jobRouter from "./modules/job/job.router";
import applicationRouter from "./modules/application/application.router";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ── Routes ─────────────────────────────────────
app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});

app.use("/api/user", userRouter);
app.use("/api/location", locationRouter);
app.use("/api/company", companyRouter);
app.use("/api/job", jobRouter);
app.use("/api/application", applicationRouter);

// ── Start ───────────────────────────────────────
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

