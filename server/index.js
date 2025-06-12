const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const port = 4000;
const app = express();
const schema = require('./schema/schema')
const mongoose = require('mongoose');

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

app.use('/graphql', graphqlHTTP({
    schema,
<<<<<<< HEAD
    graphiql: true
=======
    graphiql: true  
>>>>>>> 7192d607962f1017400a97a7e0df291d3f163396
}));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
