import { Component, Input, OnInit } from '@angular/core';
import {
  MedicalComponent,
  MedicalFolder,
} from '../../models/medical-folder.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-medical-folder-tree',
  templateUrl: './medical-folder-tree.component.html',
  styleUrls: ['./medical-folder-tree.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class MedicalFolderTreeComponent implements OnInit {
  @Input() component!: MedicalComponent;
  @Input() level: number = 0;

  isExpanded: boolean = false;
  isFolder: boolean = false;
  children: MedicalComponent[] = [];

  ngOnInit(): void {
    this.isFolder = this.component instanceof MedicalFolder;
    if (this.isFolder) {
      this.children = (this.component as MedicalFolder).getChildren();
      // Auto-expand first level
      if (this.level === 0) {
        this.isExpanded = true;
      }
    }
  }

  toggleExpand(): void {
    if (this.isFolder) {
      this.isExpanded = !this.isExpanded;
    }
  }

  getIcon(): string {
    if (!this.isFolder) {
      return 'description'; // File icon
    }
    return this.isExpanded ? 'folder_open' : 'folder'; // Folder icons
  }
}
