import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http:HttpClient) { }

createBooking(data:any){
  return this.http.post('/api/CarRentalApp/CreateNewBooking',data)
}

getBookings(){
   return this.http.get('/api/CarRentalApp/geAllBookings')
}

getVehicles() {
  return this.http.get('/api/CarRentalApp/GetCars');
}
}
