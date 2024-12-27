import express from 'express';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const PORT = 4000; // Change port if necessary

// Middleware to parse incoming request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle PubSubHubBub POST notifications
app.post('/youtube/live', (req, res) => {
    const { feed } = req.body;
    console.log('Received notification:', feed);

    // Check if there's a live video, you can then update your React state accordingly
    const liveVideo = feed && feed.entry;
    if (liveVideo) {
        console.log('Live Video:', liveVideo);
        // Handle live status update logic here, such as sending updates to the frontend
    }

    res.status(200).send('Notification received');
});

// Handle PubSubHubBub verification requests (used when you first subscribe)
app.get('/youtube/live', (req, res) => {
    const { 'hub.challenge': hubChallenge } = req.query;
    console.log('Verification request received:', req.query);
    res.status(200).send(hubChallenge);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
