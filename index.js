import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import videoRoutes from './routes/videos.js';

const app = express();

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