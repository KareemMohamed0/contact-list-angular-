import { Injectable, OnInit } from '@angular/core';
import { User } from '../modal/user';
import { tokenNotExpired } from 'angular2-jwt';
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable()
export class GlobalService {

  user: User;
  authTokent: any;

  register: string = 'user/register/';
  athunicate: string = 'user/athunicate/';
  gerContacts: string = 'api/contacts/';
  addContact: string = 'api/contact/';
  deleteContact: string = 'api/contact/';
  uploadProfileImage: string = 'user/upload';
  getAllUsers: string = 'user/allUsers';





  constructor(private http: HttpClient) { }

  returnMainUrl() {
    return (document.location.host == 'localhost:4200') ? 'http://localhost:3000/' : '';
  }
  /**
   * get http headers 
   */
  private httpOptions(isSecure: boolean) {
    if (isSecure)
      return {
        headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
          .append('Authorization', this.loadToken())
      }
    else
      return {
        headers: new HttpHeaders()
          .append('Content-Type', 'application/json')
      }
  }
  private ImageUploadFormdata(image) {
    let formData = new FormData();
    formData.append("profileImage", image);
    return formData;
  }
  /**
   * working with back-end communication
   */
  getRequest(url: string, isSecure: boolean) {
    const httpOptions = this.httpOptions(isSecure);
    console.log(httpOptions)
    return this.http.get<any[]>(this.returnMainUrl() + url, httpOptions);
  }

  postRequest(url: string, postItem: any, isSecure: boolean) {
    const httpOptions = this.httpOptions(isSecure);
    return this.http.post(this.returnMainUrl() + url, postItem, httpOptions);
  }

  deleteRequest(url: string, id: string, isSecure: boolean) {
    const httpOptions = this.httpOptions(isSecure);
    return this.http.delete(this.returnMainUrl() + url + id, httpOptions);
  }

  updateRequest(url: string, id: string, updateItem: any, isSecure: boolean) {
    const httpOptions = this.httpOptions(isSecure);
    return this.http.put<any[]>(this.returnMainUrl() + url + id, updateItem, httpOptions);
  }
  postImage(url: string, postImage: any) {
    const formData = this.ImageUploadFormdata(postImage);
    console.log(formData);
    return this.http.post(this.returnMainUrl() + url, formData);
  }


  /**
   * working with storage 
   */
  loadToken() {
    return localStorage.getItem('id_token');
  }
  getUserDate(): User {
    return JSON.parse(localStorage.getItem('user'));
  }
  loggedIn() {
    return tokenNotExpired('id_token');
  }
  logOut() {
    this.authTokent = null;
    this.user = null;
    localStorage.clear();
  }

  storeUserData(tokent: any, user: User) {
    localStorage.setItem('id_token', tokent);
    localStorage.setItem('user', JSON.stringify(user));
    this.authTokent = tokent;
    this.user = user;
  }

}
