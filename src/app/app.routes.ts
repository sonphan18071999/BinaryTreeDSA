import { Routes } from '@angular/router';
import { MedicalFolderDemoComponent } from './components/medical-folder-demo/medical-folder-demo.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  },
  {
    path: 'index',
    component: MedicalFolderDemoComponent,
  },
];
