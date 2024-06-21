import express from "express";
import cors from "cors";
import routes from "./routes.js";
import response from "express";
const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.get("/", (req, res) => {
    return res.json("server up in 3333");
});

app.listen(3333, ()=> console.log("server up in 3333"));