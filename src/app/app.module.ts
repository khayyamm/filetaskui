import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FileShareTimeDialog } from './dialogs/file-share-time-dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileService } from './services/file-upload.service';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DialogModule } from '@angular/cdk/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedFilesComponent } from './components/shared-files/shared-files.component';
import { FilesComponent } from './components/files/files.component';
import { DownloadPublicFileComponent } from './download-public-file/download-public-file.component';



@NgModule({
  declarations: [
    AppComponent,
    FileShareTimeDialog,
    SharedFilesComponent,
    FilesComponent,
    DownloadPublicFileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,  
    MatIconModule,  
    MatButtonModule,  
    MatCardModule,  
    MatProgressBarModule,
    MatTableModule,
    MatCheckboxModule,
    DialogModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
