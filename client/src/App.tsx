import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import BookDetails from './components/BookDetails';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});

const App: React.FC = () => {
    const [refetchTrigger, setRefetchTrigger] = React.useState(0);
    const [selectedBookId, setSelectedBookId] = React.useState<string | null>(null);

    const handleBookAdded = () => {
        setRefetchTrigger(prev => prev + 1);
        setSelectedBookId(null); 
    };

    return (
        <ApolloProvider client={client}>
            <div id="main">
                <h1 style={{'padding':'20px'}}>Salah's Reading List</h1>
                <div style={{'display':'flex', 'flexDirection':'row'}}>
                    <div style={{'flex': '1'}}>
                        <BookList 
                            key={refetchTrigger} 
                            onBookSelect={setSelectedBookId}
                            selectedBookId={selectedBookId}
                        />
                    </div>
                    <div style={{'flex': '1'}}>
                        <BookDetails bookId={selectedBookId} />
                    </div>
                </div>
                <AddBook onBookAdded={handleBookAdded} />
            </div>
        </ApolloProvider>
    );
};

export default App;