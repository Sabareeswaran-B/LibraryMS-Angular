import { Book } from "./book.model";
import { Employee } from "./employee.model";
import { Visitor } from "./visitor.model";

export class Lending {
    lendingId!: string;
    visitorId!: string;
    bookId!: string;
    employeeId!: string;
    lendedOn!: string;
    lendinglimit!: string;
    book!: Book;
    employee!: Employee;
    visitor!: Visitor;
}