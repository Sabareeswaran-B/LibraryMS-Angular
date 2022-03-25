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
    return this.httpClient.get(`${env.baseUrl}/visitor/getallvisitors`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
  }

  //Get a single visitor by his id
  getVisitorById(id: string) {
    return this.httpClient.get(`${env.baseUrl}/visitor/getvisitorbyid/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
  }

  //Add a new visitor to the database
  addNewVisitor(visitor: Visitor) {
    return this.httpClient.post(`${env.baseUrl}/visitor/addnewvisitor`,
      {
        visitorName: visitor.visitorName,
        visitorAge: visitor.visitorAge,
        visitorAddress: visitor.visitorAddress,
        visitorEmail: visitor.visitorEmail,
        visitorPhoneNo: visitor.visitorPhoneNo,
        isEmployee: visitor.isEmployee,
        isAuthor: visitor.isAuthor,
      },
      { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
  }

  //Update the visitor info which is already exist in the database
  updateExistingVisitor(id: string, visitor: Visitor) {
    return this.httpClient.put(`${env.baseUrl}/visitor/updateexistingvisitor/${id}`, visitor,
      { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
  }

  //delete the visitor from the database
  deleteVisitor(id: string) {
    return this.httpClient.delete(`${env.baseUrl}/visitor/deletevisitor/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
  }

  //lending Apis

  //Get all lending in the database
  getAllLendings() {
    return this.httpClient.get(`${env.baseUrl}/lending/getalllendings`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
  }

  //Get a single lending by its id
  getLendingById(id: string) {
    return this.httpClient.get(`${env.baseUrl}/lending/getlendingbyid/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
  }

  //Add a new lending to the database
  addNewLending(lending: Lending) {
    return this.httpClient.post(`${env.baseUrl}/lending/addnewlending`, {
      bookId: lending.bookId,
      visitorId: lending.visitorId,
      employeeId: lending.employeeId,
      lendinglimit: lending.lendinglimit.toString()
    }, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
  }

  //Update the lending info which is already exist in the database
  updateExistingLending(id: string, lending: Lending) {
    return this.httpClient.put(`${env.baseUrl}/lending/updateexistinglending/${id}`, lending, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
  }

  //delete the lending from the database
  deleteLending(id: string) {
    return this.httpClient.delete(`${env.baseUrl}/lending/deletelending/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
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

