import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileService } from '../services/file-upload.service';

@Component({
  selector: 'app-download-public-file',
  templateUrl: './download-public-file.component.html',
  styleUrls: ['./download-public-file.component.css']
})
export class DownloadPublicFileComponent implements OnInit {

  fileShareId!: string;
  constructor(private activatedRoute: ActivatedRoute, private fileService : FileService) {}


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.fileShareId = params.get('id')!;
    });

    this.downloadFile();
  }
  downloadFile() {
    this.fileService.downloadSharedFile(this.fileShareId).subscribe((response: Blob) => {
      let binaryData = [];
      binaryData.push(response);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: response.type }));
      downloadLink.setAttribute('download', this.fileShareId);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }), (error: any) => console.log('Error downloading the file'),
  () => console.info('File downloaded successfully');
  }

}
