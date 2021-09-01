import { loadEnv } from './utils/func';
import { fkrGetPatient } from '@navikt/fkr-client';
import { writeFileSync } from 'fs';
import { fileExists } from '@nrwl/workspace/src/utils/fileutils';
import { join } from 'path';

loadEnv();

fkrGetPatient().then((patients) => {
  if (!fileExists(join(process.cwd(), 'package.json'))) {
    console.warn('Exiting script, not in project root directory');
    process.exit(-1);
  }
  const patientsFolder = join(process.cwd(), 'examples', 'fkr');
  writeFileSync(join(patientsFolder, 'patients.json'), JSON.stringify(patients), 'utf-8');
  patients.forEach((patient) => {
    console.log(patient.id);
  });
});
