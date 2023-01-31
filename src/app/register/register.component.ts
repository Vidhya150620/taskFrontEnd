import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataApiServiceService } from '../data-api-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  constructor(public apiService : DataApiServiceService, private router: Router) { }

  Registration:any;
  formsubmited = false;
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.Registration = new FormGroup({
      username: new FormControl('',[
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password : new FormControl('', Validators.required),
      confirmpassword : new FormControl('', Validators.required),
    })

}
submit(){
  
}
}
