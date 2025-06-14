import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './BookList.css';

interface Author {
    id: string;
    name: string;
    age: number;
}

interface Book {
    id: string;
    name: string;
    genre: string;
    author: Author;
}

interface BookListProps {
    onBookSelect: (bookId: string) => void;
    selectedBookId: string | null;
}

const GET_BOOKS_QUERY = gql`
    {
        books {
            id
            name
            genre
            author {
                id
                name
                age
            }
        }
    }
`;

const BookList: React.FC<BookListProps> = ({ onBookSelect, selectedBookId }) => {
    const { loading, error, data, refetch } = useQuery(GET_BOOKS_QUERY);

    if (loading) return (
        <div className="loading">
            <p>Loading books...</p>
        </div>
    );

    if (error) return (
        <div className="error">
            <p>Error loading books: {error.message}</p>
            <button onClick={() => refetch()}>Retry</button>
        </div>
    );

    if (!data.books.length) return (
        <div className="empty-state">
            <p>No books found. Add your first book!</p>
        </div>
    );

    return (
        <div className="book-list-container">
            <div className="book-list-header">
                <h2>Available Books</h2>
                <button onClick={() => refetch()} className="refresh-button">
                    Refresh List
                </button>
            </div>
            <ul id="book-list">
                {data.books.map((book: Book) => (
                    <li 
                        key={book.id} 
                        className={`book-item ${selectedBookId === book.id ? 'selected' : ''}`}
                        onClick={() => onBookSelect(book.id)}
                    >
                        <div className="book-info">
                            <h3>{book.name}</h3>
                            <p className="genre">{book.genre}</p>
                            <p className="author">by {book.author.name} (Age: {book.author.age})</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BookList;
