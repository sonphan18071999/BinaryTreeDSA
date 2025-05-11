import { Component, OnInit } from '@angular/core';
import {
  MedicalFolder,
  MedicalRecordItem,
  MedicalComponentFactory,
  convertTreeToComposite,
} from '../../models/medical-folder.model';
import { MedicalRecord, MedicalRecordTree } from '../../models/medical.class';
import { CommonModule } from '@angular/common';
import { MedicalFolderTreeComponent } from '../medical-folder-tree/medical-folder-tree.component';

@Component({
  selector: 'app-medical-folder-demo',
  templateUrl: './medical-folder-demo.component.html',
  styleUrls: ['./medical-folder-demo.component.scss'],
  standalone: true,
  imports: [CommonModule, MedicalFolderTreeComponent],
})
export class MedicalFolderDemoComponent implements OnInit {
  rootFolder!: MedicalFolder;
  useBST = true; // Public property for template binding

  constructor() {}

  ngOnInit(): void {
    this.updateStructure();
  }

  /**
   * Toggle between BST and manual structure
   */
  toggleStructure(): void {
    this.useBST = !this.useBST;
    this.updateStructure();
  }

  /**
   * Update the folder structure based on current mode
   */
  private updateStructure(): void {
    if (this.useBST) {
      this.createBSTBasedStructure();
    } else {
      this.createManualStructure();
    }
  }

  /**
   * Creates a hierarchical folder structure using Binary Search Tree
   */
  private createBSTBasedStructure(): void {
    const medicalTree = new MedicalRecordTree();
    const sampleRecords = this.createSampleRecords();

    // Insert records into BST

    sampleRecords.forEach((record) => medicalTree.insert(record));

    // Convert BST to composite structure
    this.rootFolder = convertTreeToComposite(medicalTree);

    // For debugging - log the structure
    console.log('BST-based folder structure created:', this.rootFolder);
  }

  /**
   * Creates a manually organized folder structure
   */
  private createManualStructure(): void {
    // Create the main container
    const rootFolder = MedicalComponentFactory.createFolder(
      'root',
      'Patient Records'
    );

    // Create and populate category folders
    const folders = this.createCategoryFolders();
    this.addFoldersToRoot(rootFolder, folders);

    // Populate each category with appropriate records
    this.populateAppointments(folders.appointmentsFolder);
    this.populateDiagnoses(folders.diagnosisFolder);
    this.populateTreatments(folders.treatmentFolder);
    this.populateLabResults(folders.labResultsFolder);
    this.populateMedications(folders.medicationsFolder);

    // Set as the main folder
    this.rootFolder = rootFolder;
  }

  /**
   * Creates category folders for organizing medical records
   */
  private createCategoryFolders() {
    return {
      appointmentsFolder: MedicalComponentFactory.createFolder(
        'appointments',
        'Appointments'
      ),
      diagnosisFolder: MedicalComponentFactory.createFolder(
        'diagnosis',
        'Diagnoses'
      ),
      treatmentFolder: MedicalComponentFactory.createFolder(
        'treatment',
        'Treatments'
      ),
      labResultsFolder: MedicalComponentFactory.createFolder(
        'lab-results',
        'Lab Results'
      ),
      medicationsFolder: MedicalComponentFactory.createFolder(
        'medications',
        'Medications'
      ),
    };
  }

  /**
   * Adds all category folders to the root folder
   */
  private addFoldersToRoot(rootFolder: MedicalFolder, folders: any): void {
    Object.values(folders).forEach((folder) => {
      rootFolder.addFolder(folder as MedicalFolder);
    });
  }

  /**
   * Creates sample medical records
   */
  private createSampleRecords(): MedicalRecord[] {
    return [
      {
        id: 1,
        patientId: 101,
        date: new Date('2023-05-15'),
        diagnosis: 'Common Cold',
        treatment: 'Rest and fluids',
        notes: 'Patient reported symptoms 2 days ago',
      },
      {
        id: 2,
        patientId: 101,
        date: new Date('2023-02-10'),
        diagnosis: 'Sprained Ankle',
        treatment: 'Ice and elevation',
        notes: 'Injury occurred during sports',
      },
      {
        id: 3,
        patientId: 101,
        date: new Date('2023-07-22'),
        diagnosis: 'Annual Checkup',
        treatment: 'No treatment needed',
        notes: 'All vitals normal',
      },
      {
        id: 4,
        patientId: 101,
        date: new Date('2023-01-05'),
        diagnosis: 'Flu',
        treatment: 'Tamiflu prescribed',
        notes: 'High fever and body aches',
      },
      {
        id: 5,
        patientId: 101,
        date: new Date('2023-09-12'),
        diagnosis: 'Allergic Reaction',
        treatment: 'Antihistamine',
        notes: 'Reaction to new medication',
      },
    ];
  }

  /**
   * Populates the Appointments folder with relevant records
   */
  private populateAppointments(folder: MedicalFolder): void {
    const checkupRecord = MedicalComponentFactory.createRecord(
      3,
      'Annual Checkup',
      new Date('2023-07-22'),
      'Annual Checkup',
      'No treatment needed',
      'All vitals normal'
    );

    const followUpRecord = MedicalComponentFactory.createRecord(
      6,
      'Follow-up Visit',
      new Date('2023-08-15'),
      'Post-treatment follow-up',
      'No further treatment needed',
      'Recovery proceeding well'
    );

    const specialistRecord = MedicalComponentFactory.createRecord(
      7,
      'Specialist Consultation',
      new Date('2023-06-05'),
      'Cardiology consultation',
      'Additional tests recommended',
      'Referred for echocardiogram'
    );

    folder.addRecord(checkupRecord);
    folder.addRecord(followUpRecord);
    folder.addRecord(specialistRecord);
  }

  /**
   * Populates the Diagnoses folder with relevant records
   */
  private populateDiagnoses(folder: MedicalFolder): void {
    const coldRecord = MedicalComponentFactory.createRecord(
      1,
      'Common Cold',
      new Date('2023-05-15'),
      'Common Cold',
      'Rest and fluids',
      'Patient reported symptoms 2 days ago'
    );

    const hypertensionRecord = MedicalComponentFactory.createRecord(
      8,
      'Hypertension',
      new Date('2023-04-10'),
      'Stage 1 Hypertension',
      'Prescribed ACE inhibitor',
      'Recommend lifestyle changes and follow-up in 3 months'
    );

    const migraineRecord = MedicalComponentFactory.createRecord(
      9,
      'Migraine',
      new Date('2023-03-21'),
      'Chronic Migraine',
      'Prescribed sumatriptan',
      'Advised to keep headache journal'
    );

    folder.addRecord(coldRecord);
    folder.addRecord(hypertensionRecord);
    folder.addRecord(migraineRecord);
  }

  /**
   * Populates the Treatments folder with relevant records
   */
  private populateTreatments(folder: MedicalFolder): void {
    const ankleRecord = MedicalComponentFactory.createRecord(
      2,
      'Sprained Ankle',
      new Date('2023-02-10'),
      'Sprained Ankle',
      'Ice and elevation',
      'Injury occurred during sports'
    );

    const physicalTherapyRecord = MedicalComponentFactory.createRecord(
      10,
      'Physical Therapy',
      new Date('2023-02-25'),
      'Ankle rehabilitation',
      '8-week therapy program',
      'Twice weekly sessions recommended'
    );

    folder.addRecord(ankleRecord);
    folder.addRecord(physicalTherapyRecord);
  }

  /**
   * Populates the Lab Results folder with relevant records
   */
  private populateLabResults(folder: MedicalFolder): void {
    const bloodworkRecord = MedicalComponentFactory.createRecord(
      11,
      'Complete Blood Count',
      new Date('2023-07-20'),
      'Routine bloodwork',
      'No abnormalities detected',
      'All values within normal range'
    );

    const cholesterolRecord = MedicalComponentFactory.createRecord(
      12,
      'Lipid Panel',
      new Date('2023-07-20'),
      'Cholesterol screening',
      'Slightly elevated LDL',
      'Dietary changes recommended'
    );

    folder.addRecord(bloodworkRecord);
    folder.addRecord(cholesterolRecord);
  }

  /**
   * Populates the Medications folder with relevant records
   */
  private populateMedications(folder: MedicalFolder): void {
    const antibioticRecord = MedicalComponentFactory.createRecord(
      13,
      'Amoxicillin',
      new Date('2023-05-15'),
      'Bacterial infection',
      '500mg 3x daily for 10 days',
      'Take with food to reduce GI upset'
    );

    const painRelieveRecord = MedicalComponentFactory.createRecord(
      14,
      'Ibuprofen',
      new Date('2023-02-10'),
      'Pain management',
      '400mg every 6 hours as needed',
      'Do not exceed 1600mg in 24 hours'
    );

    folder.addRecord(antibioticRecord);
    folder.addRecord(painRelieveRecord);
  }
}
