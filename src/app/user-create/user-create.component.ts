import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  contact: { id; email; firstname; lastname; password; designation; application; } = {
    id: null,
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    designation: null,
    application: null,
  };

  constructor(public dataService: DataService) {}

  ngOnInit() {}

  createContact() {
    console.log(this.contact);
    this.dataService.createUser(this.contact);
    this.contact = { id:null, email: '', firstname: '', lastname: '', password: '', designation: null, application: null };
  }
}
