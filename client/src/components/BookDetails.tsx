import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './BookDetails.css';

const GET_BOOK_QUERY = gql`
    query GetBook($id: ID!) {
        book(id: $id) {
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

const BookDetails: React.FC<BookDetailsProps> = ({ bookId }) => {
    const { loading, error, data } = useQuery(GET_BOOK_QUERY, {
        variables: { id: bookId },
        skip: !bookId
    });

    if (!bookId) {
        return (
            <div className="book-details-container">
                <div className="no-selection">
                    <p>Select a book to see its details</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="book-details-container">
                <div className="loading">
                    <p>Loading book details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="book-details-container">
                <div className="error">
                    <p>Error loading book details: {error.message}</p>
                </div>
            </div>
        );
    }

    const book: Book = data.book;

    return (
        <div className="book-details-container">
            <div className="book-details">
                <h2>{book.name}</h2>
                <div className="details-content">
                    <div className="detail-item">
                        <span className="label">Genre:</span>
                        <span className="value">{book.genre}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Author:</span>
                        <span className="value">{book.author.name}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Author Age:</span>
                        <span className="value">{book.author.age}</span>
                    </div>
                    <div className="detail-item">
                        <span className="label">Author ID:</span>
                        <span className="value">{book.author.id}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;