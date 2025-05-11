import { Component, Input, OnInit } from '@angular/core';
import {
  MedicalComponent,
  MedicalFolder,
  isFolder,
  isRecord,
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

  public isExpanded: boolean = false;
  public isFolder: boolean = false;
  public children: MedicalComponent[] = [];

  ngOnInit(): void {
    this.isFolder = isFolder(this.component);
    if (this.isFolder) {
      this.children = (this.component as MedicalFolder).getChildren();
      // Auto-expand first level
      if (this.level === 0) this.isExpanded = true;
    }
  }

  toggleExpand(): void {
    if (this.isFolder) {
      this.isExpanded = !this.isExpanded;
    }
  }

  getIcon(): string {
    if (this.component.isLeaf()) {
      return 'fa-regular fa-file-lines';
    }
    return this.isExpanded
      ? 'fa-regular fa-folder-open'
      : 'fa-regular fa-folder';
  }
}
