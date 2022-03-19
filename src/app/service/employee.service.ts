import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { Lending } from '../model/lending.model';
import { LoginRequest } from '../model/login.request';
import { Visitor } from '../model/visitor.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  constructor(private httpClient: HttpClient) {
  }

  //login api
  login(user: LoginRequest) {
    return this.httpClient.post(`${env.baseUrl}/account/login`, user)
  }


  //Visitor Api

  //Get all visitor in the database
  getAllVisitors() {
    return this.httpClient.get(`${env.baseUrl}/visitor/getallvisitors`);
  }

  //Get a single visitor by his id
  getVisitorById(id: string) {
    return this.httpClient.get(`${env.baseUrl}/visitor/getvisitorbyid/${id}`);
  }

  //Add a new visitor to the database
  addNewVisitor(visitor: Visitor) {
    return this.httpClient.post(`${env.baseUrl}/visitor/addnewvisitor`, visitor);
  }

  //Update the visitor info which is already exist in the database
  updateExistingVisitor(id: string, visitor: Visitor) {
    return this.httpClient.post(`${env.baseUrl}/visitor/updateexistingvisitor/${id}`, visitor);
  }

  //delete the visitor from the database
  deleteVisitor(id: string) {
    return this.httpClient.delete(`${env.baseUrl}/visitor/deletevisitor/${id}`);
  }

  //lending Apis

  //Get all lending in the database
  getAllLendings() {
    return this.httpClient.get(`${env.baseUrl}/lending/getalllendings`);
  }

  //Get a single lending by its id
  getLendingById(id: string) {
    return this.httpClient.get(`${env.baseUrl}/lending/getlendingbyid/${id}`);
  }

  //Add a new lending to the database
  addNewLending(lending: Lending) {
    return this.httpClient.post(`${env.baseUrl}/lending/addnewlending`, lending);
  }

  //Update the lending info which is already exist in the database
  updateExistingLending(id: string, lending: Lending) {
    return this.httpClient.post(`${env.baseUrl}/lending/updateexistinglending/${id}`, lending);
  }

  //delete the lending from the database
  deleteLending(id: string) {
    return this.httpClient.delete(`${env.baseUrl}/lending/deletelending/${id}`);
  }



  //get all apis

  //Get all books in the library
  getAllBooks() {
    return this.httpClient.get(`${env.baseUrl}/book/getallbooks`);
  }

  //Get all author in the database
  getAllAuthors() {
    return this.httpClient.get(`${env.baseUrl}/author/getallauthors`);
  }

  //Get all employee in the database
  getAllEmployees() {
    return this.httpClient.get(`${env.baseUrl}/employee/getallemployees`);
  }
}

