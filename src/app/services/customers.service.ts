import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http:HttpClient) { }

  getCustomer(){
    return this.http.get('/api/CarRentalApp/GetCustomers')
  }

  onUpdate(data:any){
     return this.http.put('/api/CarRentalApp/UpdateCustomer',data)
  }

  onAdd(data:any){
     return this.http.post('/api/CarRentalApp/CreateNewCustomer',data)
  }

  onDelete(id:number){
    return this.http.delete(`/api/CarRentalApp/DeletCustomerById/?id=${id}`)
  }   

}
