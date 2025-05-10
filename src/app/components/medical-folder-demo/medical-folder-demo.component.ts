import { Component, OnInit } from '@angular/core';
import {
  MedicalFolder,
  MedicalRecordItem,
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

  constructor() {}

  ngOnInit(): void {
    // Create a sample medical record tree
    const medicalTree = new MedicalRecordTree();

    // Add sample records
    const sampleRecords: MedicalRecord[] = [
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

    // Insert records into tree
    sampleRecords.forEach((record) => medicalTree.insert(record));

    // Convert the binary tree to composite structure
    // this.rootFolder = convertTreeToComposite(medicalTree);

    // Optionally, create a more structured organization using Composite pattern
    // This demonstrates manual creation of a hierarchical structure
    const manualRootFolder = new MedicalFolder(
      'manual-root',
      'Patient Records'
    );

    // Create category folders
    const appointmentsFolder = new MedicalFolder(
      'appointments',
      'Appointments'
    );
    const diagnosisFolder = new MedicalFolder('diagnosis', 'Diagnoses');
    const treatmentFolder = new MedicalFolder('treatment', 'Treatments');
    const labResultsFolder = new MedicalFolder('lab-results', 'Lab Results');
    const medicationsFolder = new MedicalFolder('medications', 'Medications');

    // Add category folders to root
    manualRootFolder.add(appointmentsFolder);
    manualRootFolder.add(diagnosisFolder);
    manualRootFolder.add(treatmentFolder);
    manualRootFolder.add(labResultsFolder);
    manualRootFolder.add(medicationsFolder);

    // Add records to appropriate folders
    const checkupRecord = new MedicalRecordItem(
      3,
      'Annual Checkup',
      new Date('2023-07-22'),
      'Annual Checkup',
      'No treatment needed',
      'All vitals normal'
    );
    appointmentsFolder.add(checkupRecord);

    // Add more appointments
    const followUpRecord = new MedicalRecordItem(
      6,
      'Follow-up Visit',
      new Date('2023-08-15'),
      'Post-treatment follow-up',
      'No further treatment needed',
      'Recovery proceeding well'
    );
    appointmentsFolder.add(followUpRecord);

    const specialistRecord = new MedicalRecordItem(
      7,
      'Specialist Consultation',
      new Date('2023-06-05'),
      'Cardiology consultation',
      'Additional tests recommended',
      'Referred for echocardiogram'
    );
    appointmentsFolder.add(specialistRecord);

    const coldRecord = new MedicalRecordItem(
      1,
      'Common Cold',
      new Date('2023-05-15'),
      'Common Cold',
      'Rest and fluids',
      'Patient reported symptoms 2 days ago'
    );
    diagnosisFolder.add(coldRecord);

    // Add more diagnoses
    const hypertensionRecord = new MedicalRecordItem(
      8,
      'Hypertension',
      new Date('2023-04-10'),
      'Stage 1 Hypertension',
      'Prescribed ACE inhibitor',
      'Recommend lifestyle changes and follow-up in 3 months'
    );
    diagnosisFolder.add(hypertensionRecord);

    const migraineRecord = new MedicalRecordItem(
      9,
      'Migraine',
      new Date('2023-03-21'),
      'Chronic Migraine',
      'Prescribed sumatriptan',
      'Advised to keep headache journal'
    );
    diagnosisFolder.add(migraineRecord);

    const ankleRecord = new MedicalRecordItem(
      2,
      'Sprained Ankle',
      new Date('2023-02-10'),
      'Sprained Ankle',
      'Ice and elevation',
      'Injury occurred during sports'
    );
    treatmentFolder.add(ankleRecord);

    // Add more treatments
    const physicalTherapyRecord = new MedicalRecordItem(
      10,
      'Physical Therapy',
      new Date('2023-02-25'),
      'Ankle rehabilitation',
      '8-week therapy program',
      'Twice weekly sessions recommended'
    );
    treatmentFolder.add(physicalTherapyRecord);

    // Lab results
    const bloodworkRecord = new MedicalRecordItem(
      11,
      'Complete Blood Count',
      new Date('2023-07-20'),
      'Routine bloodwork',
      'No abnormalities detected',
      'All values within normal range'
    );
    labResultsFolder.add(bloodworkRecord);

    const cholesterolRecord = new MedicalRecordItem(
      12,
      'Lipid Panel',
      new Date('2023-07-20'),
      'Cholesterol screening',
      'Slightly elevated LDL',
      'Dietary changes recommended'
    );
    labResultsFolder.add(cholesterolRecord);

    // Medications
    const antibioticRecord = new MedicalRecordItem(
      13,
      'Amoxicillin',
      new Date('2023-05-15'),
      'Bacterial infection',
      '500mg 3x daily for 10 days',
      'Take with food to reduce GI upset'
    );
    medicationsFolder.add(antibioticRecord);

    const painRelieveRecord = new MedicalRecordItem(
      14,
      'Ibuprofen',
      new Date('2023-02-10'),
      'Pain management',
      '400mg every 6 hours as needed',
      'Do not exceed 1600mg in 24 hours'
    );
    medicationsFolder.add(painRelieveRecord);

    // Use the auto-generated tree instead of the manual one for this demo
    // this.rootFolder = manualRootFolder;
    this.rootFolder = manualRootFolder; // Use the manual mock data structure
    // this.rootFolder = convertTreeToComposite(medicalTree); // Comment out the auto-generated tree
  }
}
