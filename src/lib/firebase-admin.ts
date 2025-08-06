import admin from 'firebase-admin';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : undefined;

if (!admin.apps.length) {
  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: "quickcap-2c243.appspot.com",
    });
  } else {
    console.warn("Firebase Admin SDK not initialized. Missing FIREBASE_SERVICE_ACCOUNT_KEY.");
  }
}

const auth = admin.auth();
const storage = admin.storage();

export { auth, storage };
