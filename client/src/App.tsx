import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import BookDetails from './components/BookDetails';
import AddBookRedis from './components/AddBookRedis';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
});

type AddBookMode = 'apollo' | 'redis';

const App: React.FC = () => {
    const [refetchTrigger, setRefetchTrigger] = React.useState(0);
    const [selectedBookId, setSelectedBookId] = React.useState<string | null>(null);
    const [addBookMode, setAddBookMode] = React.useState<AddBookMode>('apollo');

    const handleBookAdded = () => {
        setRefetchTrigger(prev => prev + 1);
        setSelectedBookId(null);
    };

    return (
        <ApolloProvider client={client}>
            <div id="main" style={{ padding: '20px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px',
                    borderBottom: '2px solid #4CAF50',
                    paddingBottom: '20px'
                }}>
                    <h1 style={{ margin: 0 }}>Salah's Reading List</h1>
                    <h2 style={{ margin: 0 }}>GraphQL X Apollo</h2>
                </div>

                <div style={{
                    display: 'flex',
                    gap: '30px',
                    marginBottom: '30px'
                }}>
                    <div style={{ flex: '1' }}>
                        <BookList 
                            key={refetchTrigger} 
                            onBookSelect={setSelectedBookId}
                            selectedBookId={selectedBookId}
                        />
                    </div>
                    <div style={{ flex: '1' }}>
                        <BookDetails bookId={selectedBookId} />
                    </div>
                </div>

                <div style={{
                    borderTop: '2px solid #4CAF50',
                    paddingTop: '30px'
                }}>
                    <div style={{ marginBottom: '20px' }}>
                        <button
                            onClick={() => setAddBookMode('apollo')}
                            style={{
                                marginRight: '10px',
                                padding: '10px 20px',
                                backgroundColor: addBookMode === 'apollo' ? '#4CAF50' : '#f0f0f0',
                                color: addBookMode === 'apollo' ? 'white' : 'black',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            Add with Apollo
                        </button>
                        <button
                            onClick={() => setAddBookMode('redis')}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: addBookMode === 'redis' ? '#4CAF50' : '#f0f0f0',
                                color: addBookMode === 'redis' ? 'white' : 'black',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            Add with Redis
                        </button>
                    </div>
                    {addBookMode === 'apollo' && (
                        <AddBook onBookAdded={handleBookAdded} />
                    )}
                    {addBookMode === 'redis' && (
                        <AddBookRedis onBookAdded={handleBookAdded} />
                    )}
                </div>
            </div>
        </ApolloProvider>
    );
};

export default App;