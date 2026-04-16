import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
     loginForm:FormGroup; 
   constructor(private fb:FormBuilder,
               private router:Router){

     this.loginForm = this.fb.group({
      userName:['',Validators.required],
      password:['',Validators.required]
    })
   }
 
     onsubmit(){
      const {userName,password}=this.loginForm.value

       if(userName==='asmita'  &&  password==='1234'){
         alert('login success!')
         this.router.navigate(['/dashboard'])
       }else{
          alert('invalid credentials')
       }
       localStorage.setItem('user','true')
     }
 
}
