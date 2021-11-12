import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoaderService} from "../service/loader.service";
import {finalize} from 'rxjs/operators';
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.isLoading.next(true);
    return next.handle(req).pipe(
      finalize(() => {
        setTimeout(() => {
          this.loaderService.isLoading.next(false);
        }, 300);
      })
    )
  }
}

export const loaderInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
];
