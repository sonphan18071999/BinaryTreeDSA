// Define the component types for type discrimination
export type ComponentType = 'folder' | 'record';

// Enhanced base interface with type discrimination
export interface MedicalComponent {
  id: string | number;
  name: string;
  readonly type: ComponentType; // Type discrimination property
  isLeaf(): boolean; // Common method across implementations
  display(): any;
}

// Type guards for safe type checking
export function isFolder(
  component: MedicalComponent
): component is MedicalFolder {
  return component.type === 'folder';
}

export function isRecord(
  component: MedicalComponent
): component is MedicalRecordItem {
  return component.type === 'record';
}

// Visitor interface for operations on components
export interface MedicalVisitor {
  visitFolder(folder: MedicalFolder): void;
  visitRecord(record: MedicalRecordItem): void;
}

// Leaf class - represents a single medical record
export class MedicalRecordItem implements MedicalComponent {
  // Type discrimination property
  public readonly type: ComponentType = 'record';

  constructor(
    public id: number,
    public name: string,
    public date: Date,
    public diagnosis: string,
    public treatment: string,
    public notes: string,
    public followUpDate?: Date
  ) {}

  isLeaf(): boolean {
    return true;
  }

  // Visitor pattern support
  accept(visitor: MedicalVisitor): void {
    visitor.visitRecord(this);
  }

  display(): any {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      date: this.date,
      diagnosis: this.diagnosis,
      treatment: this.treatment,
    };
  }
}

// Composite class - represents a folder that can contain other folders or records
export class MedicalFolder implements MedicalComponent {
  // Type discrimination property
  public readonly type: ComponentType = 'folder';
  private children: MedicalComponent[] = [];

  constructor(public id: string | number, public name: string) {}

  isLeaf(): boolean {
    return false;
  }

  // Visitor pattern support
  accept(visitor: MedicalVisitor): void {
    visitor.visitFolder(this);
  }

  // Type-specific methods for better clarity
  addFolder(folder: MedicalFolder): void {
    if (folder.type === 'folder') {
      this.children.push(folder);
    }
  }

  addRecord(record: MedicalRecordItem): void {
    if (record.type === 'record') {
      this.children.push(record);
    }
  }

  // General method maintained for compatibility
  add(component: MedicalComponent): void {
    this.children.push(component);
  }

  remove(component: MedicalComponent): void {
    const index = this.children.findIndex((c) => c.id === component.id);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  getChildren(): MedicalComponent[] {
    return this.children;
  }

  // Get only folder children
  getFolders(): MedicalFolder[] {
    return this.children.filter(isFolder) as MedicalFolder[];
  }

  // Get only record children
  getRecords(): MedicalRecordItem[] {
    return this.children.filter(isRecord) as MedicalRecordItem[];
  }

  display(): any {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      children: this.children.map((child) => child.display()),
    };
  }
}

// Central factory for component creation
export class MedicalComponentFactory {
  static createFolder(id: string | number, name: string): MedicalFolder {
    return new MedicalFolder(id, name);
  }

  static createRecord(
    id: number,
    name: string,
    date: Date,
    diagnosis: string,
    treatment: string,
    notes: string,
    followUpDate?: Date
  ): MedicalRecordItem {
    return new MedicalRecordItem(
      id,
      name,
      date,
      diagnosis,
      treatment,
      notes,
      followUpDate
    );
  }
}
