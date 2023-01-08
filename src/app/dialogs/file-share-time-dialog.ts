import {Component, Inject} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FileDetails } from '../interfaces/interface';
import { FileService } from '../services/file-upload.service';

@Component({
    selector: 'file-share-time-dialog',
    templateUrl:'file-share-time-dialog.html',
  })
  export class FileShareTimeDialog {
 
    shareTimeSection = new FormGroup({
      day: new FormControl('0'),
      hour: new FormControl('0')
    });

    
    fileDetail : FileDetails;   
    isShared :boolean = false;

    constructor(
      public dialogRef: MatDialogRef<FileShareTimeDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any, private fileService: FileService
    ) 
    {
       this.fileDetail = data.file;
       console.log(this.fileDetail);
    }
  
    onCloseClick(): void {
      this.dialogRef.close();
    }

    onShareClick() : void {
        this.getFileShareLink();
    }

    getFileShareLink() {
      let day =  this.shareTimeSection.get('day')?.value!;
      let hour =  this.shareTimeSection.get('hour')?.value!;
      let shareTime = (parseFloat(day) * 24 ) + parseFloat(hour);
      
      if(isNaN(shareTime) && shareTime <= 0) {
        alert('Please insert valid time!');
        return;
      }

      this.fileService.getFileDownloadLink(this.fileDetail.id, shareTime)
      .subscribe({
        next: (data: any) => {
            this.isShared = data;
        },
        error: (error: any) => {         
            console.log('There was an error!', error);
        }
    })
    }
    
  }

