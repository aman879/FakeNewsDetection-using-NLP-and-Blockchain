const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('success');
});

app.post('/predict', async (req, res) => {
    try {
        const inputData = req.body;
        const response = await axios.post('http://127.0.0.1:5000/predict', inputData);
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/api/news', (req, res) => {
    const contractDir = path.join(__dirname, '..', 'frontend', 'src', 'contracts');
    const newsFilePath = path.join(contractDir, 'news.json');

    if (!fs.existsSync(contractDir)) {
        fs.mkdirSync(contractDir);
    }

    const { newsId, title, news, prediction, prbFakeNews, prbTrueNews, newsData } = req.body;

    const newsDatas = {
        newsId,
        title,
        news,
        prediction,
        prbFakeNews,
        prbTrueNews,
        newsData
    };

    if (!fs.existsSync(newsFilePath)) {
        fs.writeFileSync(newsFilePath, '[]');
    }

    fs.readFile(newsFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error adding news');
            return;
        }

        let news = [];
        if (data) {
            news = JSON.parse(data);
        }
        news.push(newsDatas);

        fs.writeFile(newsFilePath, JSON.stringify(news), 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                res.status(500).send('Error adding news');
                return;
            }
            console.log('News added successfully');
            res.status(200).send('News added successfully');
        });
    });
});

app.post('/api/news-update', (req, res) => {
    const contractDir = path.join(__dirname, '..', 'frontend', 'src', 'contracts');
    const newsFilePath = path.join(contractDir, 'news.json');

    const { newsId, newsData } = req.body;

    fs.readFile(newsFilePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Error adding news');
            return;
        }

        let news = [];
        if (data) {
            news = JSON.parse(data);
        }
        
        // Find the index of the news with the matching newsId
        const index = news.findIndex(item => item.newsId === newsId);

        if (index !== -1) {
            // Update the newsData of the news at the found index
            news[index].newsData = newsData;
        } else {
            // If news with the given newsId is not found, push the new newsDatas
            console.error("News ID not found")
        }

        fs.writeFile(newsFilePath, JSON.stringify(news), 'utf8', (err) => {
            if (err) {
                console.error('Error writing file:', err);
                res.status(500).send('Error updating news');
                return;
            }
            console.log('News updated successfully');
            res.status(200).send('News updated successfully');
        });
    });
})


app.listen(3000, () => {
    console.log('App is running on port 3000');
});
