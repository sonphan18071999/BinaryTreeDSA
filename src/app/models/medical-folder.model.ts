// Component interface - base for all elements
export interface MedicalComponent {
  id: string | number;
  name: string;
  display(): any;
}

// Leaf class - represents a single medical record
export class MedicalRecordItem implements MedicalComponent {
  constructor(
    public id: number,
    public name: string,
    public date: Date,
    public diagnosis: string,
    public treatment: string,
    public notes: string,
    public followUpDate?: Date
  ) {}

  display(): any {
    return {
      id: this.id,
      name: this.name,
      type: 'record',
      date: this.date,
      diagnosis: this.diagnosis,
      treatment: this.treatment,
    };
  }
}

// Composite class - represents a folder that can contain other folders or records
export class MedicalFolder implements MedicalComponent {
  private children: MedicalComponent[] = [];

  constructor(public id: string | number, public name: string) {}

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

  display(): any {
    return {
      id: this.id,
      name: this.name,
      type: 'folder',
      children: this.children.map((child) => child.display()),
    };
  }
}

// Utility function to convert MedicalRecordTree to Composite structure
export function convertTreeToComposite(tree: any): MedicalFolder {
  // Create root folder
  const rootFolder = new MedicalFolder('root', 'Medical Records');

  // Helper function to traverse the binary tree and populate the composite structure
  function traverseTree(node: any, parentFolder: MedicalFolder) {
    if (!node) return;

    // Create record item
    const record = new MedicalRecordItem(
      node.record.id,
      `Record ${node.record.id}`,
      node.record.date,
      node.record.diagnosis,
      node.record.treatment,
      node.record.notes,
      node.record.followUpDate
    );

    // Add to parent folder
    parentFolder.add(record);

    // Process left and right subtrees if needed
    if (node.left || node.right) {
      // We could create subfolders for date ranges or categories
      const leftFolder = node.left
        ? new MedicalFolder(
            `folder-${node.record.id}-left`,
            `Before ${node.record.date.toLocaleDateString()}`
          )
        : null;
      const rightFolder = node.right
        ? new MedicalFolder(
            `folder-${node.record.id}-right`,
            `After ${node.record.date.toLocaleDateString()}`
          )
        : null;

      if (leftFolder) {
        parentFolder.add(leftFolder);
        traverseTree(node.left, leftFolder);
      }

      if (rightFolder) {
        parentFolder.add(rightFolder);
        traverseTree(node.right, rightFolder);
      }
    }
  }

  // Start traversal from the root
  traverseTree(tree.root, rootFolder);

  return rootFolder;
}
