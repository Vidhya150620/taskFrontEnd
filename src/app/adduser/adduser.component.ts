import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataApiServiceService } from '../data-api-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Country, State, City } from 'country-state-city';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit{
  constructor(public apiService : DataApiServiceService, private router: Router,
    @Inject(MAT_DIALOG_DATA)public editdata:any) { }

  adduserForm:any;
  formsubmited = false;
  action: String = "Save User"
  countries: any;
 state: any = [];
 city: any;
 countrycode: any;
  
  ngOnInit(): void {

    this.countries = Country.getAllCountries();

    this.adduserForm = new FormGroup({
      name: new FormControl('',[
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[a-zA-Z ]*$'),
      ]),
      email:new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      mobilenumber: new FormControl('',Validators.required),
      address: new FormControl('', Validators.required),
      countries: new FormControl('', Validators.required),
   State: new FormControl('', Validators.required),
   district: new FormControl('', Validators.required),
    });
    console.log(this.editdata)
    if(this.editdata){
      this.action = "Update"
      this.adduserForm.controls['name'].setValue(this.editdata.name)
      this.adduserForm.controls['email'].setValue(this.editdata.email)
      this.adduserForm.controls['mobilenumber'].setValue(this.editdata.mobilenumber)
      this.adduserForm.controls['address'].setValue(this.editdata.address)
      this.adduserForm.controls['countries'].setValue(this.editdata.countries)
      this.adduserForm.controls['State'].setValue(this.editdata.State)
      this.adduserForm.controls['district'].setValue(this.editdata.district)
    }
    this.state = State.getStatesOfCountry(this.editdata.countries);
    this.city = City.getCitiesOfState(this.editdata.countries,this.editdata.State);
  }

  submit(){
    this.formsubmited = true;
    if (!this.editdata) {
      if (this.adduserForm.valid) {
        this.apiService.submituser(this.adduserForm.value).subscribe((res: any) => {
          window.location.reload()
        })
      }
    }else {
      if(this.adduserForm.valid){
      this.updatedata();
      console.log("this.data")
      window.location.reload()
      }
      
    }
  }

  updatedata(){
    this.apiService.updatedatauser(this.adduserForm.value,this.editdata._id).subscribe((res:any)=>{
      

    })
  }

  selectstate(event: any) {
    this.adduserForm.get('district')?.setValue(null);
    this.adduserForm.get('State')?.setValue(null);
    this.countrycode = event.target.value;
    console.log(this.countrycode, 'country code');
    this.state = State.getStatesOfCountry(event.target.value);
  }
  citydata: any;
  selectcity(event: any) {
    this.adduserForm.get('district')?.setValue(null);
    // this.supplier.get('state')?.setValue(null);
    console.log(event.target.value);
    this.citydata = event.target.value;
    this.city = City.getCitiesOfState(this.countrycode, event.target.value);
  }

}
