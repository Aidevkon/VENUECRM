import { initializeApp, getApps, cert } from 'firebase-admin/app';

import { getFirestore } from 'firebase-admin/firestore';

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

let db: FirebaseFirestore.Firestore;

if (process.env.NODE_ENV === 'development' || (projectId && clientEmail && privateKey)) {
    try {
        if (!getApps().length) {
            if (projectId && clientEmail && privateKey) {
                initializeApp({
                    projectId,
                    credential: cert({
                        projectId,
                        clientEmail,
                        privateKey,
                    }),
                });
            } else {
                console.warn("Firebase env vars missing. Skipping initialization.");
            }
        }
        // Only try to get firestore if we have an app or if we are skipping init in a safely handled way
        // However, getFirestore() throws if no app is initialized.
        if (getApps().length) {
            db = getFirestore();
        }
    } catch (error) {
        console.error("Firebase initialization error:", error);
    }
}

// Export db. It might be undefined if initialization failed or env vars are missing.
// The API routes should handle this case or it will crash at runtime when used.
export { db };
