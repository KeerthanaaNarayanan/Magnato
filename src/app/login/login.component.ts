import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';
  // pwdPattern = '^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?!.*s).{6,12}$';
  login_url = this.dataservice.base_url + 'login';
  reponse_content;
  request_body;
  requestOptions: Object = {
    responseType: 'text',
  };
  userForm: FormGroup;

  constructor(
    private dataservice: DataService,
    private http: HttpClient,
    public formBuilder: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  ngOnInit(): void {}

  navigation(response) {
    if (response == 'pass') { this.router.navigate(['/home']); }
    else { alert(this.reponse_content); }
  }

  getLogin() {
    this.http
      .post<any>(
        this.login_url,
        {
          email: this.userForm.get('email')?.value,
          password: this.userForm.get('password')?.value,
        },
        this.requestOptions
      )
      .subscribe(
        (data) => {
          this.reponse_content = data;
          this.navigation(this.reponse_content);
        },
        (error: any) => {
          this.reponse_content = error;
        }
      );
  }
}

// error(message: string, options?: any) {
        // this.alert(new Alert({ ...options, type: AlertType.Error, message }));
    // }
