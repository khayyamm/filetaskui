import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';  
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  readonly apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }


  getAllFiles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/file/allfiles');
  }

  getAllSharedFiles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/file/allsharedfiles');
  }

  getFileDownloadLink(id: number, hour : number): any {
    return this.http.get<any>(this.apiUrl + '/file/getfiledownloadlink/'+id+'/'+hour);
  }

  downloadFile(id:number) : any {
    return this.http.get(this.apiUrl + '/file/getfile/'+id, {responseType: 'blob'});   
  }

  downloadSharedFile(id:string) : any {
    return this.http.get(this.apiUrl + '/file/getsharedfile/'+id, {responseType: 'blob'});   
  }

  upload(formData : FormData) : any {
    return this.http.post<any>(this.apiUrl +'/file/upload', formData, {  
        reportProgress: true,  
        observe: 'events'  
      });  
  }  

}
