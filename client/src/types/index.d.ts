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

interface BookDetailsProps {
    bookId: string | null;
}