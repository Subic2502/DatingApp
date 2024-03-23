import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError } from 'rxjs';


@Injectable()
export class errorInterceptor implements HttpInterceptor {
  constructor(private router:Router,private toastr:ToastrService){}
  
  
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    throw next.handle(request).pipe(
      catchError((error:HttpErrorResponse) => {
        if(error){
          switch(error.status){
            case 400:
              if(error.error.errors){
                const modelStateErrors = [];
                for(const key  in error.error.errors){
                  if(error.error.errors[key]){
                    modelStateErrors.push(error.error.errors[key])
                  }
                }
                throw modelStateErrors;
              }else{
                this.toastr.error(error.error,error.status.toString())
              }
              break;
            case 401:
              this.toastr.error('Neovlasceno',error.status.toString());
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras :NavigationExtras = {state: {error:error.error}};
              this.router.navigateByUrl('/sertver-error',navigationExtras);
              break;
            default:
              this.toastr.error("Nesto neocekivan se desilo!");
              console.log(error);
              break;       
          }
        }
        throw error;
      })
    )
  }
};
