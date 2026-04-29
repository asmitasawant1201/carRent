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
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
   }
 
     onsubmit(){

       const data=this.loginForm.value;
       
       const users= JSON.parse(localStorage.getItem('users') || '[]')
       console.log('users',users)

      const value = users.find((n:any)=>n.email===data.email)

      if(value){
        alert('login succesfull')
        localStorage.setItem('new',value)
        this.router.navigate(['dashboard'])
      }else{
        alert('invalid credintial registration first')
      }



      // const {userName,password}=this.loginForm.value

      //  if(userName==='asmita' && password==='1234'){
      //    alert('login success!');

      //     localStorage.setItem('user','true')

      //    this.router.navigate(['/dashboard'])
      //  }else{
      //     alert('invalid credentials')
      //  }
      
     }
 
}
