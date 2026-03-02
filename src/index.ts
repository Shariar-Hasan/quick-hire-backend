import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import userRouter from "./modules/user/user.router";
import locationRouter from "./modules/location/location.router";
import companyRouter from "./modules/company/company.router";
import jobRouter from "./modules/job/job.router";
import applicationRouter from "./modules/application/application.router";
import uploadRouter from "./modules/upload/upload.router";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
}));
app.use(express.json());

// ── Static files ────────────────────────────────
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// ── Routes ─────────────────────────────────────
app.get("/health", (req, res) => {
    res.json({ message: "Server is health is okay" });
});

app.use("/api/user", userRouter);
app.use("/api/location", locationRouter);
app.use("/api/company", companyRouter);
app.use("/api/job", jobRouter);
app.use("/api/application", applicationRouter);
app.use("/api/upload", uploadRouter);

// ── Start ───────────────────────────────────────
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

