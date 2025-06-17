import React, { useState } from "react";
import "./AddBook.css"; // Assuming you want to reuse the same styling
import { createBook } from "../actions/create";
import { useQuery, gql } from '@apollo/client';

const GET_AUTHORS = gql`
    query GetAuthors {
        authors {
            id
            name
        }
    }
`;

interface AddBookRedisProps {
    onBookAdded: () => void;
}

const AddBookRedis: React.FC<AddBookRedisProps> = ({ onBookAdded }) => {
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { loading: authorsLoading, error: authorsError, data } = useQuery(GET_AUTHORS);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const result = await createBook({ name, genre, authorId });
            
            if (result.success) {
                setName('');
                setGenre('');
                setAuthorId('');
                onBookAdded();
            } else {
                setError(result.error || 'Failed to add book');
            }
        } catch {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    if (authorsLoading) return <p>Loading authors...</p>;
    if (authorsError) return <p>Error loading authors: {authorsError.message}</p>;

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Add New Book (Redis)</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Book name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}
                        required
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Genre:</label>
                    <input
                        type="text"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}
                        required
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#666' }}>Author:</label>
                    <select
                        value={authorId}
                        onChange={(e) => setAuthorId(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}
                        required
                    >
                        <option value="">Select an author</option>
                        {data?.authors.map((author: { id: string; name: string }) => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </div>
                {error && (
                    <div style={{ color: '#d32f2f', marginTop: '10px' }}>
                        {error}
                    </div>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1
                    }}
                >
                    {loading ? 'Adding...' : 'Add Book'}
                </button>
            </form>
        </div>
    );
};

export default AddBookRedis;
