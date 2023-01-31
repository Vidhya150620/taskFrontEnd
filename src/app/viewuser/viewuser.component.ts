import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataApiServiceService } from '../data-api-service.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AdduserComponent } from '../adduser/adduser.component';

export interface Data {
  Name: string;
  PhoneNumber: number;
  Address: String;
  State: String;
  City: String
}
@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit{

  openDialog() {
    this.dialog.open(AdduserComponent, {
      width:'50%'
    });
  }

  constructor(public apiService : DataApiServiceService, private router: Router,public dialog: MatDialog) { }


  public displayedColumns: string[] = ['name', 'mobilenumber', 'address', 'State',"district","edit","delete"];
  
  public dataSource:any  = [];

  ngOnInit(): void {
    this.getdata();

  }


  public getdatadetails:any
getdata(){
  this.apiService.getuserdata().subscribe((res:any)=>{
    this.getdatadetails = res;
    this.dataSource = res;
      console.table(this.getdatadetails);
  })
}
data:any
edit(data:any){

  this.dialog.open(AdduserComponent, {
    width:'50%',data:data
  });

  // this.apiService.getdatabyPassingId(id).subscribe((res:any)=>{
  //   this.data = res
  // })

}
delete(id:any){
  console.log("aaaa",id)
  this.apiService.deleteUser(id).subscribe((res:any)=>{
    console.log("data",res);
    window.location.reload()
  })

}

}
