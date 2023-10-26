import express from "express";
import cors from "cors";
import mysql from "mysql";

const Query = (sql: string, vals: unknown[] = []) => {
    return new Promise((resolve, reject) => {
        mysql.createPool(process.env.DB_URL!).query(sql, vals, (err, data) => {
            err ? reject(err) : resolve(data);
        });
    });
};

const isProduction = process.env.NODE_ENV === "production";

const app = express();
app.use(express.json());
app.use(isProduction ? express.static("public") : cors());

app.get("/api/boards", (req, res) => {
    Query("SELECT * FROM Boards ORDER BY id DESC")
        .then(res.json)
        .catch((err) => {
            res.status(500).json({
                message: `Can't get old boards right now :( (send Andrew "${err.sqlMessage || err.message}")`,
            });
        });
});

app.post("/api/boards", (req, res) => {
    const { name, board, number } = req.body;
    if (!name || !board || !number)
        return res.status(400).json({ message: `Make sure both name and the board are provided!` });

    Query("INSERT INTO Boards SET ?", [{ name, board, number }])
        .then(res.json)
        .catch((err) => {
            const message = err.sqlMessage || err.message;
            res.status(500).json({ message: `Can't add new boards :( (give error code of "${message}" to Andrew)` });
        });
});

if (isProduction) app.get("*", (req, res) => res.sendFile("index.html", { root: "public" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
