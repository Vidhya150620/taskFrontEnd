import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataApiServiceService } from '../data-api-service.service';
import { Router } from '@angular/router';
declare let $: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(public apiService : DataApiServiceService, private router: Router) { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    // this.login = new FormGroup({
    //   username: new FormControl('',Validators.required),
    //   password:new FormControl('',Validators.required)
    // })
  }
  username!: String; 
  password:String | undefined
  login:any;
  submitted = false;
  error_message:any;
  isdisplay = false

  login_now(){

    if(this.username == "Admin" && this.password == "admin@123"){
      console.log("user Successfully login")
      this.router.navigate(['ViewuserDetails'])
    }else{
    alert("username or password wrong")
    }


    // this.submitted = true;
    // if(this.login.valid)
    // this.apiService.submitlogin(this.login.value).subscribe((res:any)=>{
    //   console.log(this.login.value,"this.login.value")

      
    //   this.router.navigate(['ViewuserDetails']);

    // })


  }
  show_password(event: any, icon: any) {
    console.log(event)
    if ($(event).attr('type') == 'text') {
      $(event).attr('type', 'password');
      $(icon.target).addClass('show_now');

    }
    else {
      $(event).attr('type', 'text');
      $(icon.target).removeClass('show_now');
    }

  }

}
