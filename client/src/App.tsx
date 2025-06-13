import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import BookList from './components/BookList';
import AddBook from './components/AddBook';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});

const App: React.FC = () => {
    const [refetchTrigger, setRefetchTrigger] = React.useState(0);

    const handleBookAdded = () => {
        setRefetchTrigger(prev => prev + 1);
    };

    return (
        <ApolloProvider client={client}>
            <div id="main">
                <h1 style={{'padding':'20px'}}>Salah's Reading List</h1>
                <div style={{'display':'flex', 'flexDirection':'row'}}>
                  <BookList key={refetchTrigger} />
                  <AddBook onBookAdded={handleBookAdded} />
                </div>
            </div>
        </ApolloProvider>
    );
};

export default App;