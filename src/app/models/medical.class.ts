export interface MedicalRecord {
  id: number;
  patientId: number;
  date: Date;
  diagnosis: string;
  treatment: string;
  notes: string;
  followUpDate?: Date;
}

export class MedicalRecordNode {
  record: MedicalRecord;
  left: MedicalRecordNode | null;
  right: MedicalRecordNode | null;

  constructor(record: MedicalRecord) {
    this.record = record;
    this.left = null;
    this.right = null;
  }
}

export class MedicalRecordTree {
  private root: MedicalRecordNode | null;

  constructor() {
    this.root = null;
  }

  // Insert a new medical record
  insert(record: MedicalRecord): void {
    this.root = this.insertNode(this.root, record);
  }

  private insertNode(
    node: MedicalRecordNode | null,
    record: MedicalRecord
  ): MedicalRecordNode {
    if (node === null) {
      return new MedicalRecordNode(record);
    }

    // Compare dates for insertion
    if (record.date < node.record.date) {
      node.left = this.insertNode(node.left, record);
    } else {
      node.right = this.insertNode(node.right, record);
    }

    return node;
  }
}
