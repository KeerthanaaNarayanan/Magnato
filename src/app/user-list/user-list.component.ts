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
  list_url = 'list-users';
  show_details = 'show-details/email/';
  delete_user = 'delete-user/email/';
  requestOptions: Object = {
    responseType: 'text',
  };
  reponse_content;

  constructor(public dataService: DataService, private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get(this.dataService.base_url + this.list_url)
      .subscribe((data) => {
        this.response_content = data as JSON;
      });
    return this.response_content;
  }
  public selectUser(email) {
    this.http
      .get(this.dataService.base_url + this.show_details + email)
      .subscribe((data) => {
        this.details = data as JSON;
        this.firstname = this.details.firstname;
        this.lastname = this.details.lastname;
        this.email = this.details.email;
        this.role = this.details.role;
        this.description = this.details.description;
      });
    return this.details;
  }

  notify(response) {
    if (response == 'User deleted successfully') {
      location.reload();
      alert(response);
    } else {
      alert(response);
    }
  }

  DeleteUser(email) {
    this.http.delete(this.dataService.base_url + this.delete_user + email,
      this.requestOptions).subscribe(
        (data) => {
          this.reponse_content = data;
          this.notify(this.reponse_content);
          console.log(this.reponse_content);
        },
        (error: any) => {
          this.reponse_content = error;
          this.notify(this.reponse_content);
          console.log(this.reponse_content);
        }
      );
    return this.details;
  }
}

