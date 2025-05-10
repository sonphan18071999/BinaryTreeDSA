import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MedicalFolderTreeComponent } from './components/medical-folder-tree/medical-folder-tree.component';
import { MedicalFolderDemoComponent } from './components/medical-folder-demo/medical-folder-demo.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    MedicalFolderTreeComponent,
    MedicalFolderDemoComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
