import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-booking',
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
     vehicles:any[]=[];
     booking:any[]=[];
     payload: any;
     data!:FormGroup;
  constructor(private service:BookingService,
              private fb:FormBuilder
  ){}

  getCarImage(bok: any): string {
  const car = this.vehicles.find(
    v => v.brand === bok.brand && v.model === bok.model
  );
  return car ? car.carImage : 'assets/no-image.png';
}

  

  ngOnInit(): void {
    this.loadVehicles();
   // this.allBookings();
    this.initForm();
    this.allBookings();
  }

   initForm(){
   this.data=this.fb.group({
     CustomerName:[''],
    model:[''],
     MobileNo:[''],
     Email:[''],
     CarId:[''],
     BookingDate:[''],
     Discount:[''],
     TotalBillAmount:['']
    })
  }

   allBookings(){
     this.service.getBookings().subscribe((res:any)=>{
        this.booking=res.data
        console.log('BOOKIGS:',this.booking)
        this.booking = Array.isArray(res) ? res : res.data || [];
         console.log('bookings array:', this.booking);
     })
   }

  //  loadVehicles(){
  //   this.service.getVehicles().subscribe((res:any)=>
  //   {
  //      this.vehicles = res.data.cars;
  //     console.log('data-',this.vehicles)
  //  })
  //  }

      loadVehicles() {
    this.service.getVehicles().subscribe({
      next: (res: any) => {
        console.log('FULL RESPONSE:', res);
        this.vehicles = Array.isArray(res.data) ? res.data : [];
        console.log('Vehicles array:', this.vehicles);
      },
      error: (err) => console.error('API Error:', err)
    });
  }
onSubmit() {

  const payload = {
    CustomerName: this.data.value.CustomerName,
    CustomerCity: this.data.value.CustomerCity,
    MobileNo: this.data.value.MobileNo,
    Email: this.data.value.Email,

    BookingId: 0, // REQUIRED by backend
    CarId: Number(this.data.value.CarId),

    BookingDate: new Date().toISOString(), // REQUIRED
    Discount: Number(this.data.value.Discount || 0),
    TotalBillAmount: Number(this.data.value.TotalBillAmount)
  };

  console.log('Payload:', payload);

  this.service.createBooking(payload).subscribe({
    next: (res: any) => {
      alert('Booking done!');
      console.log('ADD:', res);
      this.data.reset();
        this.allBookings();
    
    },
    error: (err) => {
      console.error('API Error:', err);
    }
  });
}




}

