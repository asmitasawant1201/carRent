import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../services/customers.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-customers',
  imports: [CommonModule,FormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
 constructor(private service:CustomersService ){}
 
  cusData={
     customerName:'',
     customerCity:'',
     mobileNo:'',
     email:''
  }

 customers:any[]=[]
 formTitle='ADD CUSTOMER DATA'
 clickEdit=false;

 ngOnInit(): void {
   this.loadCustomers();
 }

 loadCustomers(){
    this.service.getCustomer().subscribe((res:any)=>{
         this.customers=res.data
    })
 }
 //showMessage = false;
 //message = '';

 onClickEdit(cus:any){
     this.clickEdit=true
     this.formTitle='Edit CUSTOMER DATA'
     this.cusData={...cus}
 }

 onClickAdd(){
  this.clickEdit=false
  this.formTitle='ADD CUSTOMER DATA'
  this.reset()
 }
  onSubmit(){
    if(this.clickEdit===true){
      this.service.onUpdate(this.cusData).subscribe(()=>{
        alert('Customer data Updated successfully!')
         //this.message = 'Customer data Updated successfully!';
          //this.showMessage = true;
         this.loadCustomers()
      })
    }else{
      this.service.onAdd(this.cusData).subscribe(()=>{
        alert('Customer data added successfully!')
        this.loadCustomers;
       // this.message = 'Customer data added successfully!';
        // this.showMessage = true;
        this.reset()
      })
    }
 }

 reset(){
   this.cusData={
     customerName:'',
     customerCity:'',
     mobileNo:'',
     email:''
  }
 }

 onClickDelete(id:number){
      this.service.onDelete(id).subscribe(()=>{
        alert('Customer deleted successfully!')
        this.loadCustomers()
      })
 }
  
}
