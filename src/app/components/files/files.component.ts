import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { HttpEventType, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';  
import { catchError, map } from 'rxjs/operators';  
import { FileService } from '../../services/file-upload.service';
import { FileDetails } from '../../interfaces/interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { FileShareTimeDialog } from '../../dialogs/file-share-time-dialog';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})


export class FilesComponent implements OnInit {

  @ViewChild("fileUpload", { static: false })
  fileUpload!: ElementRef;
  files : any = [];  
  
  filesDownloadDetails: FileDetails[] = [];

  get isDownloadButtonAvailable(){
    return this.filesDownloadDetails.length>0;
  }

  public displayedColumns =  ['fileselect','fileType', 'name', 'uploadDate', 'numberOfDownloads', 'actions'];
  public dataSource = new MatTableDataSource<FileDetails>();

  constructor(private fileService: FileService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getFiles();
  }

  onClick() {  
    const fileUpload = this.fileUpload.nativeElement; 

    fileUpload.onchange = () => {  
      for (let index = 0; index < fileUpload.files.length; index++)  
      {  
        const file = fileUpload.files[index];  
        this.files.push({ data: file, inProgress: false, progress: 0});  
      }  
        this.uploadFiles();  
      };  
    fileUpload.click();  
}

  getFiles() {
    this.fileService.getAllFiles()
    .subscribe({
      next: data => {
          this.dataSource.data = data;
          console.log(data);
      },
      error: error => {         
          console.log('There was an error!', error);
      }
   })
  }
  
  

  openFileShareDialog(fileDetail : FileDetails): void {
    const dialogRef = this.dialog.open(FileShareTimeDialog, {
      height: '300px',
      width: '400px',
      data: {file: fileDetail},
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }    
 

  uploadFiles() {  
    this.fileUpload.nativeElement.value = '';  
    this.files.forEach((file:any )=> {  
      this.uploadFile(file);  
    });  
  }


  uploadFile(file : any) {      
    const formData = new FormData();
    formData.append('file', file.data);  
    file.inProgress = true;  
    this.fileService.upload(formData)
    .pipe(  
      map((event :any) => {  
        switch (event.type) {  
          case HttpEventType.UploadProgress:  
            file.progress = Math.round(event.loaded * 100 / event.total);  
            break;  
          case HttpEventType.Response:  
            return event;  
        }  
      }),  
      catchError((error: HttpErrorResponse) => {  
        console.log(error);
        file.inProgress = false;  
        return of(`${file.data.name} upload failed.`);  
      })).subscribe((event: any) => {  
        if (typeof (event) === 'object') {  
          this.getFiles();
          console.log(event.body);  
        }  
      });  
  }

  downloadSelected(){
    this.filesDownloadDetails.forEach(fileDetail => {
      this.download(fileDetail.id, fileDetail.name);
    })
  }

  download(id :number, fileName : string){  
      this.fileService.downloadFile(id).subscribe((response: Blob) => {
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: response.type }));
        downloadLink.setAttribute('download', fileName);
        document.body.appendChild(downloadLink);
        downloadLink.click();
			}), (error: any) => console.log('Error downloading the file'),
		() => console.info('File downloaded successfully');

  }  

  itemChanged(item: FileDetails, event: MatCheckboxChange ) {
    if(event.checked){
      this.filesDownloadDetails.push(item);
    }
    else{
      const index = this.filesDownloadDetails.indexOf(item);
      if(index > -1){
        this.filesDownloadDetails.splice(index, 1);
      }      
    }   
  }
}
