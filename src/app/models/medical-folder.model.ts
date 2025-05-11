export interface MedicalComponent {
  id: string | number;
  name: string;
  display(): any;
}

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
