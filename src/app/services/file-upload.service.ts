import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient,
    @Inject('BaseURL') private baseUrl: string) { }

  upload(file: File, eventId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.patch(
      `${this.baseUrl}storage/upload/${eventId}`,
      formData
    );
  }

  getImageUrl(filename: string): string {
    return `${this.baseUrl}uploads/${filename}`;
  }
}
