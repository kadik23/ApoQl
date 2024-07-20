const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const port = 4000;
const app = express();

app.use('/graphql', graphqlHTTP({
}));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
