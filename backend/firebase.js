import admin from 'firebase-admin';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

let db = null;
let isFirebaseInitialized = false;

try {
  const possiblePaths = [
    process.env.FIREBASE_SERVICE_ACCOUNT_PATH,
    './serviceaccountkey.json',
    './serviceAccountKey.json',
    path.join(process.cwd(), 'serviceaccountkey.json'),
    path.join(process.cwd(), 'serviceAccountKey.json'),
    'C:\\Users\\PMLS\\.gemini\\antigravity\\scratch\\rohm_eternal\\backend\\serviceaccountkey.json'
  ].filter(Boolean);

  let keyFilePath = possiblePaths.find(p => fs.existsSync(p));

  if (keyFilePath) {
    const serviceAccount = JSON.parse(fs.readFileSync(keyFilePath, 'utf8'));
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    }
    db = admin.firestore();
    isFirebaseInitialized = true;
    console.log(`⚡ Firebase Firestore Connected Successfully using key file: ${path.basename(keyFilePath)}!`);
  } else if (process.env.FIREBASE_PROJECT_ID) {
    if (!admin.apps.length) {
      admin.initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID
      });
    }
    db = admin.firestore();
    isFirebaseInitialized = true;
    console.log('⚡ Firebase Admin initialized with Project ID:', process.env.FIREBASE_PROJECT_ID);
  } else {
    console.log('ℹ️ Operating in local memory fallback mode.');
  }
} catch (err) {
  console.warn('⚠️ Firebase initialization notice:', err.message);
}

export { db, isFirebaseInitialized, admin };
