import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  create_user_url = this.dataService.base_url + 'create-user';
  createForm: FormGroup;
  requestOptions: Object = {
    responseType: 'text',
  };
  reponse_content;

  constructor(
    public dataService: DataService,
    public formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.createForm = this.formBuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      password: [''],
    });
  }

  ngOnInit(): void {}
  notify(response) {
    if (response == 'User saved successfully') {
      alert(response);
    } else {
      alert(response);
    }
  }

  createUser() {
    this.http
      .post<any>(
        this.create_user_url,
        {
          firstname: this.createForm.get('firstname')?.value,
          lastname: this.createForm.get('lastname')?.value,
          email: this.createForm.get('email')?.value,
          password: this.createForm.get('password')?.value,
        },
        this.requestOptions
      )
      .subscribe(
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
  }
}

