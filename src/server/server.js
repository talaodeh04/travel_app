import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(express.static("dist"));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("dist", "index.html"));
});

const PORT = 8000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app, server };
