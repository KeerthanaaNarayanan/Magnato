import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  response_content;
  string_json_content;
  base_url = 'http://127.0.0.1:5000/';

  constructor(private http: HttpClient) {}
  public getUsers(): Array<{
    email;
    firstname;
    lastname;
    designation;
  }> {
    this.http.get('http://127.0.0.1:5000/list-users').subscribe((data) => {
      this.response_content = data as JSON;
      console.log('I am here in data services');
      console.log(JSON.stringify(this.response_content));
    });
    this.string_json_content = JSON.stringify(this.response_content);
    return this.string_json_content;
  }

  public createUser(user: {
    id;
    email;
    firstname;
    lastname;
    password;
    designation;
    application;
  }) {
    // this.designation, this.application = this.setDesignation(this.lastname) // work on this
    this.response_content.push(user);
  }
}
