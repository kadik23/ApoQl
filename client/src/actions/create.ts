interface BookData {
    name: string;
    genre: string;
    authorId: string;
}

interface CreateBookResponse {
    success?: boolean;
    error?: string;
    data?: any;
}

export const createBook = async (bookData: BookData): Promise<CreateBookResponse> => {
    try {
        const response = await fetch('http://localhost:4000/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookData),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                success: false,
                error: data.message || 'Failed to create book'
            };
        }

        return {
            success: true,
            data
        };
    } catch (error) {
        return {
            success: false,
            error: 'Network error occurred'
        };
    }
}; 