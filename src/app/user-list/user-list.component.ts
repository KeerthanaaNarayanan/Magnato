import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  response_content;
  details;
  firstname;
  lastname;
  role;
  email;
  description;

  constructor(public dataService: DataService, private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://127.0.0.1:5000/list-users').subscribe((data) => {
      this.response_content = data as JSON;
    });
    return this.response_content;
  }
  public selectContact(email) {
    this.http.get('http://127.0.0.1:5000/show-details/email/' + email).subscribe((data) => {
      this.details = data as JSON;
      this.firstname = this.details.firstname;
      this.lastname = this.details.lastname;
      this.email = this.details.email;
      this.role = this.details.role;
      this.description = this.details.description;

    });
    return this.details;
  }
}

