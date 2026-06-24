import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_SETTINGS } from '../shared/api-settings';

export interface ContactMessageRequest {
  name: string;
  phone: string;
  email: string;
  preferredContact: string;
  subject: string;
  message: string;
  website: string;
}

export interface ContactMessageResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactMessageService {
  private readonly contactUrl = `${API_SETTINGS.apiBaseUrl}/api/contact`;

  constructor(private http: HttpClient) {}

  sendMessage(request: ContactMessageRequest): Observable<ContactMessageResponse> {
    return this.http.post<ContactMessageResponse>(this.contactUrl, request);
  }
}