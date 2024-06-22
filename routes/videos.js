import express from 'express';
import fs from 'fs';
import {v4 as uuidv4} from 'uuid';

const router = express.Router();
const videoData = './data/video-details.json';

router.use(express.json());

// read video data //
function readVideoData() {
    const data = fs.readFileSync(videoData);
    return JSON.parse(data);
};

// write to the data file //
function writeVideoData() {
    fs.writeFileSync(videoData, JSON.stringify(data, null, 2));
};

// return relevant video data //
function readFilteredVideoData() {
    const parsedVideoData = readVideoData();
    const filteredVideoData = parsedVideoData.map(({ id, title, channel, image}) => ({
        id,
        title,
        channel,
        image,
    }));
    return filteredVideoData;
};

// GET /videos request //
router.get('/', (req, res) => {
    const filteredVideoData = readFilteredVideoData();
    if (filteredVideoData.length === 0) {
        res.status(404).json({message: 'No videos found.'});
    } else {
        res.json(filteredVideoData);
    }
});

// GET /videos/:id request //
router.get('/:id', (req, res) => {
    const {id} = req.params;
    const videoData = readVideoData();
    const video = videoData.find((v) => v.id === id);
    if (video) {
        res.json(video);
    } else {
        res.status(404).json({message: 'Video not found.'});
    }
});

// POST /videos request //
router.post('/', (req, res) => {
    const {title, description} = req.body;
    const videoData = readVideoData();
    const newVideo = {
        id: uuidv4(),
        title,
        description,
        channel: 'Usain Bolt',
        image: '/public/images/Upload-video-preview.jpg',
        views: '0',
        likes: '0',
        timestamp: Date.now(),
        comments: [],
    };
    videoData.push(newVideo);
    writeVideoData(videoData);
    res.status(201).json(newVideo);
});

export default router;