const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const port = 4000;
const app = express();
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const Redis = require('ioredis');
const bodyParser = require('body-parser');

const redis = new Redis({
    host: "redis-18361.c244.us-east-1-2.ec2.redns.redis-cloud.com",
    port: 18361,
    password: process.env.REDIS_PASSWORD || "jerkk9ZUdc8QZ83GxtO5mLUWCYcwV5WR",
    retryStrategy: function(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
    }
});

redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});

redis.on('connect', () => {
    console.log('Connected to Redis');
});

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/graphql-ninja', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB database');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});

app.post('/api/books', async (req, res) => {
    try {
        const { name, genre, authorId } = req.body;

        if (!name || !genre || !authorId) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields'
            });
        }

        const bookId = `book:${Date.now()}`;
        const bookData = {
            id: bookId,
            name,
            genre,
            authorId
        };

        // Store the book in Redis as a hash
        await redis.hmset(bookId, bookData);
        
        // Add to a list of all books
        await redis.lpush('books', bookId);

        res.json({
            success: true,
            data: bookData
        });
    } catch (error) {
        console.error('Error adding book to Redis:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to add book: ' + error.message
        });
    }
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true  
}));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
