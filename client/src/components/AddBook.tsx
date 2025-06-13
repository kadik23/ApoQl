import React, { useState } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import './AddBook.css';

interface Author {
    id: string;
    name: string;
}

interface AuthorsData {
    authors: Author[];
}

const ADD_BOOK_MUTATION = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
    }
`;

const GET_AUTHORS_QUERY = gql`
    {
        authors {
            name
            id
        }
    }
`;

const AddBook: React.FC<{ onBookAdded?: () => void }> = ({ onBookAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        genre: '',
        authorId: ''
    });
    const [error, setError] = useState<string | null>(null);

    const { loading, data } = useQuery<AuthorsData>(GET_AUTHORS_QUERY);
    const [addBook, { loading: mutationLoading }] = useMutation(ADD_BOOK_MUTATION);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.name || !formData.genre || !formData.authorId) {
            setError('Please fill in all fields');
            return;
        }

        try {
            await addBook({
                variables: {
                    name: formData.name,
                    genre: formData.genre,
                    authorId: formData.authorId
                }
            });

            // Clear form
            setFormData({
                name: '',
                genre: '',
                authorId: ''
            });

            // Notify parent component
            onBookAdded?.();
        } catch (err) {
            setError('Failed to add book. Please try again.');
            console.error('Error adding book:', err);
        }
    };

    return (
        <div className="add-book-container">
            <h2>Add New Book</h2>
            <form id="add-book" onSubmit={handleSubmit}>
                {error && <div className="error-message">{error}</div>}
                
                <div className="form-group">
                    <label htmlFor="name">Book Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter book name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="genre">Genre:</label>
                    <input
                        type="text"
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleInputChange}
                        placeholder="Enter genre"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="authorId">Author:</label>
                    <select
                        id="authorId"
                        name="authorId"
                        value={formData.authorId}
                        onChange={handleInputChange}
                    >
                        <option value="">Select author</option>
                        {loading ? (
                            <option disabled>Loading authors...</option>
                        ) : (
                            data?.authors.map(author => (
                                <option key={author.id} value={author.id}>
                                    {author.name}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={mutationLoading}
                >
                    {mutationLoading ? 'Adding...' : 'Add Book'}
                </button>
            </form>
        </div>
    );
};

export default AddBook;