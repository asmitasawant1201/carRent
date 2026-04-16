import { Component } from '@angular/core';
import { FormGroup ,FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-registration',
  imports: [MatFormFieldModule,MatLabel,MatInputModule,MatCardModule,ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
       fullName: [''],
        email: [''],
        mobileNo: [''],
        password: [''],
        confirmPassword: [''],
        gender: [''],
        country: [''],
        state: [''],
        city: ['']
    })
  }

  onSubmit(){

  }

}
