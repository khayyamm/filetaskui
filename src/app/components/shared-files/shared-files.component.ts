import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FileShareDetails } from 'src/app/interfaces/interface';
import { FileService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-shared-files',
  templateUrl: './shared-files.component.html',
  styleUrls: ['./shared-files.component.css']
})
export class SharedFilesComponent implements OnInit{

  public displayedColumns =  ['name', 'downloadLink', 'downloadAvailableUntil'];
  public dataSource = new MatTableDataSource<FileShareDetails>();

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.getAllSharedFiles();
  }

  getAllSharedFiles() {
      this.fileService.getAllSharedFiles()
          .subscribe({
            next: data => {
                this.dataSource.data = data;
            },
            error: error => {         
                console.log('There was an error!', error);
            }
        })
  }

}
