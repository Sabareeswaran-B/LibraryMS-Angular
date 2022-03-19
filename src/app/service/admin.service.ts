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
        return this.httpClient.get(`${env.baseUrl}/book/getallbooks`);
    }

    //Get a single book by its id
    getBookById(id: string) {
        return this.httpClient.get(`${env.baseUrl}/book/getbookbyid/${id}`);
    }

    //add a new book to the database
    addNewBook(book: Book) {
        return this.httpClient.post(`${env.baseUrl}/book/addnewbook`, book);
    }

    //update the already existing book in the database
    updateExistingBook(id: string, book: Book) {
        return this.httpClient.put(`${env.baseUrl}/book/updateexistingbook/${id}`, book)
    }

    //add stock of the book which is already in the library
    addStock(id: string, copiesToAdd: number) {
        return this.httpClient.put(`${env.baseUrl}/book/addstock/${id}/${copiesToAdd}`, {});
    }
    
    //remove stock of the book which is already in the library
    removeStock(id: string, copiesToRemove: number) {
        return this.httpClient.put(`${env.baseUrl}/book/removestock/${id}/${copiesToRemove}`, {});
    }

    //delete the book from the library database
    deleteBook(id: string) {
        return this.httpClient.delete(`${env.baseUrl}/book/deletebook/${id}`);
    }



    //Author Apis

    //Get all author in the database
    getAllAuthors() {
        return this.httpClient.get(`${env.baseUrl}/author/getallauthors`);
    }

    //Get a single author by his id
    getAuthorById(id: string) {
        return this.httpClient.get(`${env.baseUrl}/author/getauthorbyid/${id}`);
    }

    //Add a new author to the database
    addNewAuthor(author: Author) {
        return this.httpClient.post(`${env.baseUrl}/author/addnewauthor`, author);
    }

    //Update the author info which is already exist in the database
    updateExistingAuthor(id: string, author: Author) {
        return this.httpClient.post(`${env.baseUrl}/author/updateexistingauthor/${id}`, author);
    }

    //delete the author from the database
    deleteAuthor(id: string) {
        return this.httpClient.delete(`${env.baseUrl}/author/deleteauthor/${id}`);
    }



    //Employee Apis

    //Get all employee in the database
    getAllEmployees() {
        return this.httpClient.get(`${env.baseUrl}/employee/getallemployees`);
    }

    //Get a single employee by his id
    getEmployeeByID(id: string) {
        return this.httpClient.get(`${env.baseUrl}/employee/getemployeebyid/${id}`);
    }

    //Add a new employee to the database
    addNewEmployee(employee: Employee) {
        return this.httpClient.post(`${env.baseUrl}/employee/addnewemployee`, employee);
    }

    //Update the employee info which is already exist in the database
    updateExistingEmployee(id: string, employee: Employee) {
        return this.httpClient.post(`${env.baseUrl}/employee/updateexistingemployee/${id}`, employee);
    }

    //delete the employee from the database
    deleteEmployee(id: string) {
        return this.httpClient.delete(`${env.baseUrl}/employee/deleteemployee/${id}`);
    }

}