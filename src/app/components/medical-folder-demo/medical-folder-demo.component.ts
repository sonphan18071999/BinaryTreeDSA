import { Component, OnInit } from '@angular/core';
import {
  MedicalFolder,
  MedicalRecordItem,
  MedicalComponentFactory,
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
    const medicalTree = new MedicalRecordTree();

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

    sampleRecords.forEach((record) => medicalTree.insert(record));

    const manualRootFolder = MedicalComponentFactory.createFolder(
      'manual-root',
      'Patient Records'
    );

    const appointmentsFolder = MedicalComponentFactory.createFolder(
      'appointments',
      'Appointments'
    );
    const diagnosisFolder = MedicalComponentFactory.createFolder(
      'diagnosis',
      'Diagnoses'
    );
    const treatmentFolder = MedicalComponentFactory.createFolder(
      'treatment',
      'Treatments'
    );
    const labResultsFolder = MedicalComponentFactory.createFolder(
      'lab-results',
      'Lab Results'
    );
    const medicationsFolder = MedicalComponentFactory.createFolder(
      'medications',
      'Medications'
    );

    manualRootFolder.addFolder(appointmentsFolder);
    manualRootFolder.addFolder(diagnosisFolder);
    manualRootFolder.addFolder(treatmentFolder);
    manualRootFolder.addFolder(labResultsFolder);
    manualRootFolder.addFolder(medicationsFolder);

    const checkupRecord = MedicalComponentFactory.createRecord(
      3,
      'Annual Checkup',
      new Date('2023-07-22'),
      'Annual Checkup',
      'No treatment needed',
      'All vitals normal'
    );
    appointmentsFolder.addRecord(checkupRecord);

    const followUpRecord = MedicalComponentFactory.createRecord(
      6,
      'Follow-up Visit',
      new Date('2023-08-15'),
      'Post-treatment follow-up',
      'No further treatment needed',
      'Recovery proceeding well'
    );
    appointmentsFolder.addRecord(followUpRecord);

    const specialistRecord = MedicalComponentFactory.createRecord(
      7,
      'Specialist Consultation',
      new Date('2023-06-05'),
      'Cardiology consultation',
      'Additional tests recommended',
      'Referred for echocardiogram'
    );
    appointmentsFolder.addRecord(specialistRecord);

    const coldRecord = MedicalComponentFactory.createRecord(
      1,
      'Common Cold',
      new Date('2023-05-15'),
      'Common Cold',
      'Rest and fluids',
      'Patient reported symptoms 2 days ago'
    );
    diagnosisFolder.addRecord(coldRecord);

    const hypertensionRecord = MedicalComponentFactory.createRecord(
      8,
      'Hypertension',
      new Date('2023-04-10'),
      'Stage 1 Hypertension',
      'Prescribed ACE inhibitor',
      'Recommend lifestyle changes and follow-up in 3 months'
    );
    diagnosisFolder.addRecord(hypertensionRecord);

    const migraineRecord = MedicalComponentFactory.createRecord(
      9,
      'Migraine',
      new Date('2023-03-21'),
      'Chronic Migraine',
      'Prescribed sumatriptan',
      'Advised to keep headache journal'
    );
    diagnosisFolder.addRecord(migraineRecord);

    const ankleRecord = MedicalComponentFactory.createRecord(
      2,
      'Sprained Ankle',
      new Date('2023-02-10'),
      'Sprained Ankle',
      'Ice and elevation',
      'Injury occurred during sports'
    );
    treatmentFolder.addRecord(ankleRecord);

    const physicalTherapyRecord = MedicalComponentFactory.createRecord(
      10,
      'Physical Therapy',
      new Date('2023-02-25'),
      'Ankle rehabilitation',
      '8-week therapy program',
      'Twice weekly sessions recommended'
    );
    treatmentFolder.addRecord(physicalTherapyRecord);

    const bloodworkRecord = MedicalComponentFactory.createRecord(
      11,
      'Complete Blood Count',
      new Date('2023-07-20'),
      'Routine bloodwork',
      'No abnormalities detected',
      'All values within normal range'
    );
    labResultsFolder.addRecord(bloodworkRecord);

    const cholesterolRecord = MedicalComponentFactory.createRecord(
      12,
      'Lipid Panel',
      new Date('2023-07-20'),
      'Cholesterol screening',
      'Slightly elevated LDL',
      'Dietary changes recommended'
    );
    labResultsFolder.addRecord(cholesterolRecord);

    const antibioticRecord = MedicalComponentFactory.createRecord(
      13,
      'Amoxicillin',
      new Date('2023-05-15'),
      'Bacterial infection',
      '500mg 3x daily for 10 days',
      'Take with food to reduce GI upset'
    );
    medicationsFolder.addRecord(antibioticRecord);

    const painRelieveRecord = MedicalComponentFactory.createRecord(
      14,
      'Ibuprofen',
      new Date('2023-02-10'),
      'Pain management',
      '400mg every 6 hours as needed',
      'Do not exceed 1600mg in 24 hours'
    );
    medicationsFolder.addRecord(painRelieveRecord);

    this.rootFolder = manualRootFolder;
  }
}
