import 'dotenv/config';

const express = require("express");
const app = express();
const cors = require("cors");
const videoRoutes = require("./routes/videos");

app.use(cors());
app.use(express.json());
app.use("/public", express.static('./public/images'));

const PORT = process.env.PORT || 8080;

app.get("/", (_req, res) => {
    res.send("Request Received.")
});

app.use("/videos", videoRoutes);

app.listen(PORT, () => {
    console.log('Server is running on port ', PORT);
})