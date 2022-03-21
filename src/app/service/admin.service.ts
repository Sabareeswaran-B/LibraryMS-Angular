import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { Author } from '../model/author.model';
import { Book } from '../model/book.model';
import { Employee } from '../model/employee.model';

@Injectable({ providedIn: 'root' })
export class AdminService {

    constructor(private httpClient: HttpClient) { }

    //Book Apis

    //Get all books in the library
    getAllBooks() {
        return this.httpClient.get(`${env.baseUrl}/book/getallbooks`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    }

    //Get a single book by its id
    getBookById(id: string) {
        return this.httpClient.get(`${env.baseUrl}/book/getbookbyid/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    }

    //add a new book to the database
    addNewBook(book: Book) {
        return this.httpClient.post(`${env.baseUrl}/book/addnewbook`, {
            bookName: book.bookName,
            authorId: book.authorId,
            copiesAvailable: book.copiesAvailable.toString(),
            releasedYear: book.releasedYear.toString(),
            edition: book.edition.toString(),
            language: book.language
        },
            { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    }

    //update the already existing book in the database
    updateExistingBook(id: string, book: Book) {
        book.edition = book.edition.toString();
        book.copiesAvailable = book.copiesAvailable.toString();
        book.releasedYear = book.releasedYear.toString();
        return this.httpClient.put(`${env.baseUrl}/book/updateexistingbook/${id}`, book, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
    }

    //add stock of the book which is already in the library
    addStock(id: string, copiesToAdd: number) {
        return this.httpClient.put(`${env.baseUrl}/book/addstock/${id}/${copiesToAdd}`, {}, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    }

    //remove stock of the book which is already in the library
    removeStock(id: string, copiesToRemove: number) {
        return this.httpClient.put(`${env.baseUrl}/book/removestock/${id}/${copiesToRemove}`, {}, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    }

    //delete the book from the library database
    deleteBook(id: string) {
        return this.httpClient.delete(`${env.baseUrl}/book/deletebook/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    }



    //Author Apis

    //Get all author in the database
    getAllAuthors() {
        return this.httpClient.get(`${env.baseUrl}/author/getallauthors`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    }

    //Get a single author by his id
    getAuthorById(id: string) {
        return this.httpClient.get(`${env.baseUrl}/author/getauthorbyid/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    }

    //Add a new author to the database
    addNewAuthor(author: Author) {
        return this.httpClient.post(`${env.baseUrl}/author/addnewauthor`,
            {
                authorName: author.authorName,
                authorAge: author.authorAge.toString(),
                primaryLanguage: author.primaryLanguage
            },
            { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }
        );
    }

    //Update the author info which is already exist in the database
    updateExistingAuthor(id: string, author: Author) {
        author.authorAge = author.authorAge.toString();
        return this.httpClient.put(`${env.baseUrl}/author/updateexistingauthor/${id}`, author, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    }

    //delete the author from the database
    deleteAuthor(id: string) {
        return this.httpClient.delete(`${env.baseUrl}/author/deleteauthor/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    }



    //Employee Apis

    //Get all employee in the database
    getAllEmployees() {
        return this.httpClient.get(`${env.baseUrl}/employee/getallemployees`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    }

    //Get a single employee by his id
    getEmployeeByID(id: string) {
        return this.httpClient.get(`${env.baseUrl}/employee/getemployeebyid/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    }

    //Add a new employee to the database
    addNewEmployee(employee: Employee) {
        return this.httpClient.post(`${env.baseUrl}/employee/addnewemployee`,
            {
                employeeName: employee.employeeName,
                employeeRole: employee.employeeRole,
                employeeAge: employee.employeeAge,
                employeeSalary: employee.employeeSalary,
                employeeEmail: employee.employeeEmail,
                employeePhoneNo: employee.employeePhoneNo,
                password: employee.password,
            }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    }

    //Update the employee info which is already exist in the database
    updateExistingEmployee(id: string, employee: Employee) {
        return this.httpClient.put(`${env.baseUrl}/employee/updateexistingemployee/${id}`, employee, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    }

    //delete the employee from the database
    deleteEmployee(id: string) {
        return this.httpClient.delete(`${env.baseUrl}/employee/deleteemployee/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    }

}