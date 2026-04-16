
import { Routes } from '@angular/router';
import { VehicalComponent } from './pages/vehical/vehical.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BookingComponent } from './pages/booking/booking.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full',
     
    },
    {    
         path:'login',
         component:LoginComponent

    },
    {
        path:'',
        component:LayoutComponent,
        canActivate: [authGuard],       // ✅ protects direct URL access
    // canActivateChild: [authGuard], 
      

        children:[
            {path:'dashboard',component:DashboardComponent },
            {path:'vehicle',component:VehicalComponent},
            {path:'customers',component:CustomersComponent},
            {path:'booking',component:BookingComponent}
        ]
    }
]

    
    

