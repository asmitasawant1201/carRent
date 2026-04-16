import { Component, OnInit } from '@angular/core';
import { VehicalService } from '../../services/vehical.service';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehical',
  standalone:true,
  imports: [CommonModule,FormsModule],
  templateUrl: './vehical.component.html',
  styleUrls: ['./vehical.component.css']
})
export class VehicalComponent implements OnInit{

 constructor(private service: VehicalService) {}

  onEdit=false;
  formTitle='ADD CARS';
  allvehicles:any[]=[];
  vehicles: any[] = [];
  filterSearch:any[]=[];
  search='';
  currentPage=2;
  pageSize=5;
  totalRecords = 0;
   userData={
       brand:'',
       model:'',
       year:'',
       color:'',
       dailyRate:'',
       regNo:'',
       carImage:''
       }
    
    ngOnInit(): void {
      this.loadVehicles();
   }
   
   // loadVehicles(){
  //   this.service.getVehicles().subscribe((res:any)=>
  //   {
  //     this.vehicles = res.data.cars;
  //     console.log('data-',this.vehicles)
  //   })
  // }
loadVehicles() {
    this.service.getVehicles().subscribe({
      next: (res: any) => {
        console.log('FULL RESPONSE:', res);
        this.vehicles = Array.isArray(res.data) ? res.data : [];
        console.log('Vehicles array:', this.vehicles);
        this.applysearch();
      },
      error: (err) => console.error('API Error:', err)
    });
  }

  pagination(){
    const start=(this.currentPage-1)*this.pageSize
    const end=this.currentPage*this.pageSize
    this.allvehicles=this.filterSearch.slice(start,end)
  }

  clickPrivious(){
     if(this.currentPage>1){
      this.currentPage--
      this.pagination();
    }
  }

  clickNext(){
    
    if(this.currentPage*this.pageSize<this.vehicles.length){
      this.currentPage++
      this.pagination();
    }
  }
  resetForm() {
    this.userData = {
      brand: '',
      model: '',
      year: '',
      color: '',
      dailyRate: '',
      regNo: '',
      carImage:''
    };
  }

  applysearch(){
    this.filterSearch=this.vehicles.filter(n=>
      n.brand.toLowerCase().includes(this.search.toLowerCase()) ||
      n.model.toLowerCase().includes(this.search.toLowerCase())
    );

     this.currentPage = 1;        // reset page
     this.totalRecords = this.filterSearch.length;
     this.pagination(); 
  }

  onAddVehicle(){
    this.formTitle='Add Car Info';
    this.onEdit = false;
   
  }

  onClickcancle(){
     this.resetForm(); 
  }

  onClickDelete(id:number){
    this.service.deleteCar(id).subscribe(()=>{
       this.loadVehicles();
    })
  }

  onClickEdit(car:any){
     this.formTitle='Edit CarData'
     this.onEdit=true;
     this.userData = {...car};   
  }

   onsubmit(){
     if(this.onEdit===true){
       this.service.updateCar(this.userData).subscribe(()=>{
       this.loadVehicles();
    })
     }else{
        this.service.addCar(this.userData).subscribe(()=>{
         this.resetForm();
         this.loadVehicles();  
      })
    }
  }
}

  
