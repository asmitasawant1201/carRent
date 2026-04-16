import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehicalService {

  constructor(private http:HttpClient) { }

getVehicles() {
  return this.http.get('/api/CarRentalApp/GetCars');
}

addCar(data:any){
  return this.http.post('/api/CarRentalApp/CreateNewCar',data);
}

deleteCar(id:number){
  return this.http.delete(`/api/CarRentalApp/DeleteCarbyCarId?carId=${id}`);
}

updateCar(data: any){
   return this.http.put(`/api/CarRentalApp/UpdateCar`,data);
}
}
