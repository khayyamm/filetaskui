import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesComponent } from './components/files/files.component';
import { SharedFilesComponent } from './components/shared-files/shared-files.component';
import { DownloadPublicFileComponent } from './download-public-file/download-public-file.component';



const routes: Routes = [
  {path: "", component: FilesComponent, pathMatch: 'full'},
  {path: 'sharedfiles', component: SharedFilesComponent},
  {path: 'downloadfile/:id', component: DownloadPublicFileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
