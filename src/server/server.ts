import express from "express";
import cors from "cors";
import router from "./routes";

const isProduction = process.env.NODE_ENV === "production";

const app = express();

app.use(express.json());
app.use(isProduction ? express.static("public") : cors());

app.use("/api", router);

if (isProduction) app.get("*", (req, res) => res.sendFile("index.html", { root: "public" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
