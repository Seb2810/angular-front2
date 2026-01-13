import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const clonedReq = req.clone({
      setHeaders: {
        'Content-Type': 'application/json'
        // Authorization: `Bearer ${token}` (plus tard)
      }
    });

    console.log('➡️ HTTP', clonedReq.method, clonedReq.url);

    return next.handle(clonedReq).pipe(
      tap({
        next: () => console.log('✅ HTTP OK'),
        error: err => console.error('❌ HTTP ERROR', err)
      })
    );
  }
}

