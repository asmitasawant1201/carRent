import { Component } from '@angular/core';
import { FormGroup ,FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { DropDataService } from '../../services/drop-data.service';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { FormControl } from '@angular/forms';
import  { Validators } from '@angular/forms';
@Component({
  selector: 'app-registration',
  imports: [MatFormFieldModule,MatLabel,MatInputModule,MatCardModule,ReactiveFormsModule,MatFormFieldModule,MatSelectModule,FormsModule,CommonModule,NgxMatSelectSearchModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  userForm: FormGroup;

  constructor(private fb: FormBuilder , private service:DropDataService) {
    this.userForm = this.fb.group({
       fullName: ['',[Validators.required, Validators.minLength(3)]],
        email: ['',[Validators.required,Validators.email]],
        mobileNo: ['',[Validators.required, Validators.minLength(10)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['',Validators.required],
        gender: ['',Validators.required],
        country: ['',Validators.required],
        state: ['',Validators.required],
        city: ['',Validators.required]
    })
  }

  data:any[] = [];

ngOnInit(): void {
  this.loadData();
}

  searchCountry =  new FormControl('');
  searchState= new FormControl('');
  searchCity= new FormControl('');

  // selectCountry:any;
  selectstate:any;
  city:any;

  states:any[]=[];
  cities:any[]=[];
  
  onCountryChange(){
    if(this.userForm.get('country')?.value){

     this.states=this.userForm.get('country')?.value.states;
    }else{
      this.states=[];
    }
     this.city=[];
     this.selectstate=null;
     this.city=null;
}

filteredCountries() {
    return this.data.filter(c =>
      c.countryName.toLowerCase().includes(this.searchCountry.value?.toLowerCase() || '')
    );
   }

  onStateChange(){
    if(this.selectstate){
      this.city=this.selectstate.cities;
    }else{
      this.city=[];
    }
    this.cities=this.selectstate.cities;
    this.city=null;
  }

  filterState(){
    return this.states.filter(s=>
      s.stateName.toLowerCase().includes(this.searchState.value?.toLowerCase() || '')
    )
  }
  
  filterCity(){
    return this.cities.filter(c=>
      c.cityName.toLowerCase().includes(this.searchCity.value?.toLowerCase() || '')
    )
  }

  loadData(){
    this.service.getData().subscribe((res)=>{
     this.data=res as any[];
     console.log('Data',this.data);
    });
  }

  onSubmit(){
     if(this.userForm.invalid){
      // alert("Form Submitted Successfully!");
      // console.log('Form Submitted:', this.userForm.value);
      alert("pls fill the required fields")
     }
      
      else{
        alert("Form Submitted Successfully!");
        console.log('Form Submitted:', this.userForm.value);
      }
    }
  }


