import { Inject, Injectable } from '@angular/core';
import { HttpInterceptorFn, HttpRequest, HttpEvent, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HmacService } from '../services/hmac.service';

export const HmacInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const hmacService = new HmacService(); // Asegúrate de que HmacService esté correctamente inyectado o instanciado
  const timestamp = hmacService.getTimestamp();
  const method = req.method;
  const url = new URL(req.url).pathname;
  const body = req.body ? JSON.stringify(req.body) : '';

  const message = `${method} ${url} ${timestamp} ${body}`;
  const signature = hmacService.generateHmac(message);

  const clonedRequest = req.clone({
    setHeaders: {
      'X-Timestamp': timestamp,
      'X-HMAC-Signature': signature
    }
  });

  return next(clonedRequest);
};
