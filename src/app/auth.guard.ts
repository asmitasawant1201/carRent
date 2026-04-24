import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {

const router= inject(Router)

const user=localStorage.getItem('user')
 console.log('Guard check → user:', user);

//return user ? true : router.createUrlTree(['/login']);

if(user){
  return true
}else{
  alert('Please login to access this page.')
   return router.createUrlTree(['/login']);

}

};
