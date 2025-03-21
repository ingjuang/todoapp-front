import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class HmacService {
  private secretKey = environment.hmacSecret;

  generateHmac(message: string): string {
    console.log('HMAC message:', message);

    return crypto.HmacSHA256(message, this.secretKey).toString(crypto.enc.Base64);
  }

  getTimestamp(): string {
    return new Date().toISOString();
  }
}
