
import { Injectable } from '@angular/core';
import { Env } from '../../src/app/environment';
import { HttpClient, HttpParams} from '@angular/common/http';
import { identifierName } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DataApiServiceService {
  baseurl = Env.baseApi;

  constructor(private http: HttpClient) { }

  getuserdata(){
    return this.http.get(this.baseurl+'/v1/add/get/user')

  }
  submituser(data:any){
    return this.http.post(this.baseurl+'/v1/add/adduser',data)
  }
  submitlogin(dta:any){
    return this.http.post(this.baseurl+'',dta)
  }
  deleteUser(id:any){
return this.http.delete(this.baseurl+'/v1/add/delete/user/'+id)
  }
  getdatabyPassingId(id:any){
    return this.http.get(this.baseurl+"/v1/add/get/user/byid/"+id)
  }
  updatedatauser(data:any,id:any){
    return this.http.put(this.baseurl+"/v1/add/update/user/"+id,data)
  }
}
