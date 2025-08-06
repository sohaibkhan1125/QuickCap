import admin from 'firebase-admin';

let app: admin.app.App;

function initializeFirebaseAdmin() {
  if (!admin.apps.length) {
    const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

    if (serviceAccountKey) {
      const serviceAccount = JSON.parse(serviceAccountKey);
      app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "quickcap-2c243.appspot.com",
      });
    } else {
      console.warn(
        "Firebase Admin SDK not initialized. Missing FIREBASE_SERVICE_ACCOUNT_KEY. Server-side Firebase features will not work."
      );
    }
  } else {
    app = admin.app();
  }
}

initializeFirebaseAdmin();

function getFirebaseAuth() {
  if (!app) {
    throw new Error(
      "Firebase Admin SDK has not been initialized. Please check your environment variables."
    );
  }
  return app.auth();
}

function getFirebaseStorage() {
  if (!app) {
    throw new Error(
      "Firebase Admin SDK has not been initialized. Please check your environment variables."
    );
  }
  return app.storage();
}

export { getFirebaseAuth, getFirebaseStorage };
