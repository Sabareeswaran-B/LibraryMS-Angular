import { Author } from "./author.model";

export class Book {
    bookId!: string;
    bookName!: string;
    releasedYear!: string;
    edition!: string;
    copiesAvailable!: string;
    language!: string;
    authorId!: string;
    author!: Author;
}