const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const port = 4000;
const app = express();
const schema = require('./schema/schema')
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true  
}));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
