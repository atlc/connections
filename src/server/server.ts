import express from "express";
import cors from "cors";
import router from "./routes";
import requisitionToken from "./controllers/requisitionToken";
import tokenCheck from "./middlewares/tokenCheck";
import db from "./db";

const isProduction = process.env.NODE_ENV === "production";

const app = express();

app.use(express.json());

app.use(cors());

if (isProduction) {
    app.use(express.static("public"));
}

app.get("/api/health", (req, res) => res.status(200).json({ message: "All good!" }));

app.use("/api", tokenCheck, router);

app.get("/auth/request", requisitionToken);

if (isProduction) app.get("*", (req, res) => res.sendFile("index.html", { root: "public" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
