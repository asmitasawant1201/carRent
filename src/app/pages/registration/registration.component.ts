import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
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
import { Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'app-registration',
  imports: [MatFormFieldModule, MatLabel, MatInputModule, MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, FormsModule, CommonModule, NgxMatSelectSearchModule,MatDatepickerModule,MatNativeDateModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  userForm: FormGroup;

  constructor(private fb: FormBuilder, private service: DropDataService) {
    this.userForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      DrivingLicenseNumber: ['', [Validators.required,Validators.pattern('^[A-Z]{2}[0-9]{13}$')]],
      LicenseExpiryDate: ['', Validators.required],
      AdharNumber: ['', [Validators.required,Validators.pattern('^[0-9]{12}$')]],
      panNumber: ['',[Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },{ validators: this.confirmPasswordValidator })
  }

  data: any[] = [];

  ngOnInit(): void {
    this.loadData();
  }

  searchCountry = new FormControl('');
  searchState = new FormControl('');
  searchCity = new FormControl('');

  // selectCountry:any;
  selectstate: any;
  city: any;

  states: any[] = [];
  cities: any[] = [];

  onCountryChange() {
    if (this.userForm.get('country')?.value) {

      this.states = this.userForm.get('country')?.value.states;
    } else {
      this.states = [];
    }
    this.city = [];
    this.selectstate = null;
    this.city = null;
  }

  filteredCountries() {
    return this.data.filter(c =>
      c.countryName.toLowerCase().includes(this.searchCountry.value?.toLowerCase() || '')
    );
  }

  onStateChange() {
   const selectedState = this.userForm.get('state')?.value;

  if (selectedState) {
    this.cities = selectedState.cities;  // ✅ correct
  } else {
    this.cities = [];
  }

  // Reset city field
  this.userForm.get('city')?.setValue('');
   
  }

  filterState() {
    return this.states.filter(s =>
      s.stateName.toLowerCase().includes(this.searchState.value?.toLowerCase() || '')
    )
  }

  filterCity() {
    return this.cities.filter(c =>
      c.cityName.toLowerCase().includes(this.searchCity.value?.toLowerCase() || '')
    )
  }

  loadData() {
    this.service.getData().subscribe((res) => {
      this.data = res as any[];
      console.log('Data', this.data);
    });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      // alert("Form Submitted Successfully!");
      // console.log('Form Submitted:', this.userForm.value);
      alert("please fill the required fields")
    }

    else {
      alert("Form Submitted Successfully!");
      console.log('Form Submitted:', this.userForm.value);
    }
  }

 confirmPasswordValidator (form: FormGroup) {
  const pass = form.get('password')?.value;
  const confirm = form.get('confirmPassword')?.value;

if (pass !== confirm) {
    form.get('confirmPassword')?.setErrors({ mismatch: true });
  } else {
    form.get('confirmPassword')?.setErrors(null);
  }
}
}


