const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.post('/unblock', async (req, res) => {
    const url = req.body.url;

    try {
        const response = await axios.get(url, { responseType: 'stream' });
        response.data.pipe(res);
    } catch (error) {
        res.status(500).send('Error: Unable to fetch the website content.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
